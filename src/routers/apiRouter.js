import express from "express";
import { createPlaylist } from "../controllers/playlistController.js";
import { addTrackToPlaylist } from "../controllers/trackController.js";

const apiRouter = express.Router();

apiRouter.get("/playlist/common", createPlaylist);

apiRouter.post("/:playlist_id/:track_id", addTrackToPlaylist);

export default apiRouter;
