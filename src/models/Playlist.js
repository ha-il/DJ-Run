import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 50 },
  description: { type: String, maxLength: 100 },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  public: { type: Boolean, required: true, default: false },
  tracks: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Track" },
  ],
  additionCount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
