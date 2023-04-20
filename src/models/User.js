import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  profileName: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
