import User from "../models/User.js";
import bcrypt from "bcrypt";

export const renderSignupPage = (req, res) => {
  return res.render(`signup.pug`, { title: "가입하기" });
};

export const renderLoginPage = (req, res) => {
  return res.render(`login.pug`, { title: "로그인하기" });
};

export const createAccount = async (req, res) => {
  const title = "가입하기";
  const { email, username, password, confirmPassword } = req.body;
  const isEmailExists = await User.exists({ email });
  const isUsernameExists = await User.exists({ username });

  if (isEmailExists && isUsernameExists) {
    return res.status(400).render(`signup.pug`, {
      title,
      errorMessage: "이미 사용중인 이메일과 사용자 이름입니다.",
    });
  }
  if (isEmailExists) {
    return res.status(400).render(`signup.pug`, {
      title,
      errorMessage: "이미 사용중인 이메일입니다.",
    });
  }
  if (isUsernameExists) {
    return res.status(400).render(`signup.pug`, {
      title,
      errorMessage: "이미 사용중인 사용자 이름입니다.",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).render(`signup.pug`, {
      title,
      errorMessage: "비밀번호가 일치하지 않습니다. 다시 시도해주세요.",
    });
  }
  try {
    await User.create({
      email,
      username,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render(`signup.pug`, {
      title: "가입하기",
      errorMessage: error._message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).render(`login.pug`, {
      title: "Login",
      errorMessage: "해당 이메일로 가입한 유저가 존재하지 않습니다.",
    });
  }

  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  if (!isValidPassword) {
    return res.status(400).render(`login.pug`, {
      title: "Login",
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }

  req.session.isLoggedIn = true;
  req.session.loggedInUser = user;

  return res.redirect("/");
};

export const loginWithKakao = (req, res) => {
  const BASE_URL = `https://kauth.kakao.com/oauth/authorize`;
  const config = {
    response_type: "code",
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
  };
  const params = new URLSearchParams(config).toString();
  const KAKAO_GET_AUTHORIZATION_CODE_URL = `${BASE_URL}?${params}`;

  return res.redirect(KAKAO_GET_AUTHORIZATION_CODE_URL);
};

export const oauthWithKaKao = async (req, res) => {
  const BASE_URL = `https://kauth.kakao.com/oauth/token`;
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    code: req.query.code,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
  };
  const params = new URLSearchParams(config).toString();
  const KAKAO_GET_TOKEN_URL = `${BASE_URL}?${params}`;
  const tokenRequest = await (
    await fetch(KAKAO_GET_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;

    const userData = await (
      await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
    ).json();

    const { id, kakao_account } = userData;
    const { is_email_valid, is_email_verified, email } = kakao_account;

    if (!is_email_valid || !is_email_verified) {
      return res.redirect("/login");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.session.isLoggedIn = true;
      req.session.loggedInUser = existingUser;
      return res.redirect("/");
    } else {
      await User.create({
        email,
        username: id,
      });
      req.session.isLoggedIn = true;
      req.session.loggedInUser = existingUser;
    }
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
