import User from "../models/User.js";
import bcrypt from "bcrypt";

export const renderSignupPage = (req, res) => {
  return res.render(`signup.pug`, { title: "가입하기" });
};

export const renderLoginPage = (req, res) => {
  return res.render(`login.pug`, { title: "로그인하기" });
};

export const renderEditProfilePage = async (req, res) => {
  return res.render("editProfile.pug", {
    title: "프로필 편집하기",
  });
};

export const renderEditPasswordPage = async (req, res) => {
  return res.render("editPassword.pug", {
    title: "비밀번호 변경하기",
  });
};

export const createAccount = async (req, res) => {
  const title = "가입하기";
  const { email, username, profileName, password, confirmPassword } = req.body;
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
      profileName,
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

export const editProfile = async (req, res) => {
  const title = "프로필 편집하기";
  const { email: inputEmail, username: inputUsername } = req.body;
  const {
    _id,
    email: loggedInEmail,
    username: loggedInUsername,
  } = req.session.loggedInUser;

  if (inputEmail === loggedInEmail && inputUsername === loggedInUsername) {
    return res.status(400).render(`editProfile.pug`, {
      title,
      errorMessage: "변경 사항이 존재하지 않아 프로필이 변경되지 않았습니다.",
    });
  }

  const existedEmail = await User.exists({ email: inputEmail });
  const existedUsername = await User.exists({ username: inputUsername });

  if (existedEmail && existedUsername) {
    return res.status(400).render(`editProfile.pug`, {
      title,
      errorMessage: "이미 사용중인 이메일과 사용자 이름입니다.",
    });
  }

  if (existedEmail && inputEmail !== loggedInEmail) {
    return res.status(400).render(`editProfile.pug`, {
      title,
      errorMessage: "이미 사용중인 이메일입니다.",
    });
  }

  if (existedUsername && inputUsername !== loggedInUsername) {
    return res.status(400).render(`editProfile.pug`, {
      title,
      errorMessage: "이미 사용중인 사용자 이름입니다.",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { email: inputEmail, username: inputUsername },
      { new: true }
    );

    req.session.loggedInUser = updatedUser;

    return res.redirect("/user/edit-profile");
  } catch (error) {
    return res.status(400).render(`editProfile.pug`, {
      title,
      errorMessage: error._message,
    });
  }
};

export const editPassword = async (req, res) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;
  const { _id } = req.session.loggedInUser;
  const user = await User.findById(_id);
  const isValidPassword = await bcrypt.compare(currentPassword, user.password);

  if (!isValidPassword) {
    return res.status(400).render(`editPassword.pug`, {
      title: "비밀번호 변경하기",
      errorMessage: "현재 비밀번호가 일치하지 않습니다.",
    });
  }

  if (newPassword !== newPasswordConfirm) {
    return res.status(400).render(`editPassword.pug`, {
      title: "비밀번호 변경하기",
      errorMessage: "입력한 새로운 비밀번호를 확인해주세요.",
    });
  }

  user.password = newPassword;
  user.save();

  return res.redirect("/logout");
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
