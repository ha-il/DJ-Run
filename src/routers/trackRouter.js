import express from "express";
import {
  renderUploadTrackPage,
  uploadTrack,
} from "../controllers/trackController.js";
import { uploadTrackMiddleware } from "../middlewares.js";

const trackRouter = express.Router();

trackRouter
  .route("/upload")
  .get(renderUploadTrackPage)
  .post(uploadTrackMiddleware.single("trackFile"), uploadTrack);

export default trackRouter;
