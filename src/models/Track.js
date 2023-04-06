import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

const trackModel = mongoose.model("Track", trackSchema);

export default trackModel;
