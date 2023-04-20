import express from "express";

const collectionRouter = express.Router();

collectionRouter.get("/playlists");
collectionRouter.get("/tracks");

export default collectionRouter;
