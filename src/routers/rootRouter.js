import express from "express";
import { getUserPlaylist } from "../controllers/playlistController.js";
import {
  createAccount,
  login,
  loginWithKakao,
  logout,
  oauthWithKaKao,
  renderLoginPage,
  renderSignupPage,
} from "../controllers/userController.js";

const rootRouter = express.Router();

rootRouter.get("/", getUserPlaylist);
rootRouter.route("/signup").get(renderSignupPage).post(createAccount);
rootRouter.route("/login").get(renderLoginPage).post(login);
rootRouter.get("/kakao/login", loginWithKakao);
rootRouter.get("/kakao/oauth", oauthWithKaKao);
rootRouter.get("/logout", logout);

export default rootRouter;
