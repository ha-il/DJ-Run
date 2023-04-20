import express from "express";

const accountRouter = express.Router();

accountRouter.get("/overview");
accountRouter.get("/profile");
accountRouter.get("/change-paaword");

export default accountRouter;
