import express from "express";
import { createPlaylist } from "../controllers/playlistController.js";
import { addTrackToPlaylist } from "../controllers/trackController.js";

const apiRouter = express.Router();

apiRouter.post("/signup");
apiRouter.post("/login");
apiRouter.post("/logout");
apiRouter.get("/chart");

apiRouter.put("/me/profile");
apiRouter.put("/me/password");
apiRouter.post("/me/playlists");
apiRouter.post("/me/playlists/running");
apiRouter.get("/me/collection/tracks");
apiRouter.get("/me/collection/playlists");
apiRouter.post("/me/collection/tracks/:track_id");

apiRouter.get("/users/:user_id");

apiRouter.get("/playlists/:playlist_id");
apiRouter.delete("/playlist/:playlist_id");

apiRouter.get("/tracks/:track_id");

export default apiRouter;
