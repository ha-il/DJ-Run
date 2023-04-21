import express from "express";
import {
  loginRequiredMiddleware,
  publicOnlyMiddleware,
  uploadTrackMiddleware,
} from "../middlewares.js";
import {
  renderChartPage,
  renderUploadTrackPage,
  uploadTrack,
} from "../controllers/trackController.js";
import {
  createAccount,
  login,
  logout,
  renderLoginPage,
  renderSignupPage,
} from "../controllers/userController.js";
import { renderHomepage } from "../controllers/playlistController.js";

const rootRouter = express.Router();

rootRouter.get("/", renderHomepage);
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
rootRouter.get("/users/:user_id");
rootRouter.get("/tracks/:track_id");
rootRouter.get("/playlists/:playlist_id");

rootRouter
  .route("/upload")
  .get(renderUploadTrackPage)
  .post(
    uploadTrackMiddleware.fields([
      { name: "trackFile" },
      { name: "trackImageFile" },
    ]),
    uploadTrack
  );

export default rootRouter;
