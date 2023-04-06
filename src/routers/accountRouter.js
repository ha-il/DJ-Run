import express from "express";

const accountRouter = express.Router();

accountRouter.get("/overview", (req, res) => res.send("ACCOUNT OVERVIEW"));

export default accountRouter;
