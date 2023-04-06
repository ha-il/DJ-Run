import express from "express";

const playlistRouter = express.Router();

playlistRouter.get("/:playlist_id", (req, res) =>
  res.send(`플레이리스트:${req.params.playlist_id}`)
);

export default playlistRouter;
