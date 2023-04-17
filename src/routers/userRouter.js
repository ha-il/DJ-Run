import express from "express";
import { loginRequiredMiddleware } from "../middlewares.js";
import {
  editPassword,
  editProfile,
  renderEditPasswordPage,
  renderEditProfilePage,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
  .route("/edit-profile")
  .all(loginRequiredMiddleware)
  .get(renderEditProfilePage)
  .post(editProfile);
userRouter
  .route("/edit-password")
  .all(loginRequiredMiddleware)
  .get(renderEditPasswordPage)
  .post(editPassword);

export default userRouter;
