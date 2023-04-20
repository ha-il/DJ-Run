import Playlist from "../models/Playlist.js";
import Track from "../models/Track.js";

export const renderUploadTrackPage = (req, res) => {
  res.render("uploadTrack.pug", { title: "트랙 등록하기" });
};

export const uploadTrack = async (req, res) => {
  const { name, artists, genres } = req.body;
  const { path } = req.file;

  try {
    await Track.create({
      name,
      artists: artists.split(","),
      genres: genres.split(","),
      durationMs: 180000,
      fileUrl: path,
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("uploadTrack.pug", {
      title: "트랙 등록하기",
      errorMessage: error._message,
    });
  }
};

export const addTrackToPlaylist = async (req, res) => {
  const { playlist_id, track_id } = req.params;
  const track = await Track.findById(track_id);
  await Playlist.findByIdAndUpdate(playlist_id, {
    $push: { tracks: track },
  });

  return res.sendStatus(200);
};
