import express from "express";
import logger from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import { localsMiddleware } from "./middlewares.js";

import rootRouter from "./routers/rootRouter.js";
import accountRouter from "./routers/accountRouter.js";
import collectionRouter from "./routers/collectionRouter.js";
import playlistRouter from "./routers/playlistRouter.js";
import apiRouter from "./routers/apiRouter.js";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("assets"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/account", accountRouter);
app.use("/collection", collectionRouter);
app.use("/playlist", playlistRouter);
app.use("/api", apiRouter);

export default app;
