import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
  },
  artists: [
    { type: String, required: true, trim: true, minLength: 1, maxLength: 50 },
  ],
  createdAt: { type: Date, required: true, default: Date.now },
});

const Track = mongoose.model("Track", trackSchema);

export default Track;
