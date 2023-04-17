import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  description: String,
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  public: Boolean,
  tracks: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Track" },
  ],
  uri: String,
  followers_total: Number,
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
