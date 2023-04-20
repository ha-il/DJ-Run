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
  durationMs: { type: Number, required: true },
  genres: [{ type: String, required: true, minlength: 1, maxlength: 20 }],
  fileUrl: { type: String, require: true },
  imageUrl: { type: String },
  additionCount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Track = mongoose.model("Track", trackSchema);

export default Track;
