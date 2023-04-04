import express from "express";
import morgan from "morgan";
import { getPlaylist } from "./src/api.js";

import { generateHTML } from "./src/ssr.js";

export const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/src", express.static("./src"));

app.get(/\/.*/, async (req, res) => {
  const data = await getPlaylist();

  const model = {
    musics: data.tracks.items.map((item, i) => {
      return {
        rank: i + 1,
        title: item.track.name,
        creator: item.track.artists[0].name,
      };
    }),
  };
  res.send(generateHTML(req.path, model));
});
