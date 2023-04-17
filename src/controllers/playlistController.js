import Playlist from "../models/Playlist";
import Track from "../models/Track";

export const renderPlaylistPage = async (req, res) => {
  const { playlist_id } = req.params;
  const playlist = await Playlist.findById(playlist_id)
    .populate("owner")
    .populate("tracks");
  const tracks = await Track.find({});

  return res.render(`playlist.pug`, {
    title: playlist.name,
    playlist,
    tracks,
  });
};

export const createPlaylist = async (req, res) => {
  const { _id } = res.locals.loggedInUser;
  const newPlaylist = await Playlist.create({
    name: "내 플레이리스트",
    owner: _id,
    tracks: [],
    followers_total: 0,
  });

  console.log(newPlaylist);
  return res.status(200).json(newPlaylist._id);
};
