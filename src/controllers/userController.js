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

export const logout = async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
