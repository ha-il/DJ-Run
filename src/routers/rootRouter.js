import express from "express";
import {
  loginRequiredMiddleware,
  publicOnlyMiddleware,
} from "../middlewares.js";
import { renderHomepage } from "../controllers/trackController.js";
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

rootRouter.get("/", (req, res) => res.render("layout.pug"));
rootRouter
  .route("/signup")
  .all(publicOnlyMiddleware)
  .get(renderSignupPage)
  .post(createAccount);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(renderLoginPage)
  .post(login);
rootRouter.get("/kakao/login", publicOnlyMiddleware, loginWithKakao);
rootRouter.get("/kakao/oauth", publicOnlyMiddleware, oauthWithKaKao);
rootRouter.get("/logout", loginRequiredMiddleware, logout);

export default rootRouter;
