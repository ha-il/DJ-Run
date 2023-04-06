import express from "express";
import logger from "morgan";

import globalRouter from "./routers/globalRouter.js";
import accountRouter from "./routers/accountRouter.js";
import playlistRouter from "./routers/playlistRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("assets"));

app.use("/", globalRouter);
app.use("/account", accountRouter);
app.use("/playlist", playlistRouter);

export default app;
