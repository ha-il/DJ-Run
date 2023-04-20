import express from "express";
import {
  loginRequiredMiddleware,
  publicOnlyMiddleware,
} from "../middlewares.js";
import {
  renderChartPage,
  renderHomepage,
} from "../controllers/trackController.js";
import {
  createAccount,
  login,
  logout,
  renderLoginPage,
  renderSignupPage,
} from "../controllers/userController.js";

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => res.render("home.pug", { title: "홈" }));
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
rootRouter.get("/chart", renderChartPage);
rootRouter.get("/search");
rootRouter.get("/queue");
rootRouter.get("/user/:user_id");
rootRouter.get("/track/:track_id");
rootRouter.get("/playlists/:playlist_id");

export default rootRouter;
