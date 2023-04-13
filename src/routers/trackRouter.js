import express from "express";
import {
  renderUploadTrackPage,
  uploadTrack,
} from "../controllers/trackController.js";

const trackRouter = express.Router();

trackRouter.route("/upload").get(renderUploadTrackPage).post(uploadTrack);

export default trackRouter;
