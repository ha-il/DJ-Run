import express from "express";
import {
  createPlaylist,
  renderCreatePlaylistPage,
  renderPlaylistPage,
} from "../controllers/playlistController";

const playlistRouter = express.Router();

playlistRouter
  .route("/common")
  .get(renderCreatePlaylistPage)
  .post(createPlaylist);
playlistRouter.get("/running");
playlistRouter.get("/:playlist_id", renderPlaylistPage);

export default playlistRouter;
