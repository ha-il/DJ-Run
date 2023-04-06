import express from "express";
import { getUserPlaylist } from "../controllers/playlistController.js";

const globalRouter = express.Router();

globalRouter.get("/", getUserPlaylist);

export default globalRouter;
