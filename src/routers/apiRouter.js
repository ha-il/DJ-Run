import express from "express";
import { getPlaylist } from "../controllers/playerController";

const apiRouter = express.Router();

apiRouter.get("/playlist/:playlist_id", getPlaylist);

export default apiRouter;
