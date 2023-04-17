import express from "express";
import { renderPlaylistPage } from "../controllers/playlistController";

const playlistRouter = express.Router();

playlistRouter.get("/:playlist_id", renderPlaylistPage);

export default playlistRouter;
