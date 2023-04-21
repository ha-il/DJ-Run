import Playlist from "../models/Playlist";
import Track from "../models/Track";

export const renderHomepage = async (req, res) => {
  const { _id } = res.locals.loggedInUser;

  try {
    const loggedInUserPlaylists = await Playlist.find({ owner: _id }).populate(
      "tracks"
    );
    if (!loggedInUserPlaylists) {
      return res.status(404).render("home.pug", {
        title: "홈",
        errorMessage:
          "생성된 플레이리스트가 없습니다. 플레이리스트를 만들어보세요!",
      });
    }
    return res.status(200).render("home.pug", {
      loggedInUserPlaylists,
      title: "홈",
      errorMessage: "에러메세지 확인용입니다.",
    });
  } catch (error) {
    return res.render("home.pug", {
      title: "홈",
      errorMessage: `플레이리스트를 불러오는 과정에서 오류가 발생했습니다. ${error._message}`,
    });
  }
};

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

export const renderCreatePlaylistPage = (req, res) => {
  return res.render("createPlaylist.pug", { title: "플레이리스트 만들기" });
};

export const createPlaylist = async (req, res) => {
  const { _id } = res.locals.loggedInUser;
  const { name, description } = req.body;
  try {
    await Playlist.create({
      name,
      owner: _id,
      tracks: [],
      description,
    });
    return res
      .status(200)
      .render("createPlaylist.pug", {
        title: "플레이리스트 만들기",
        errorMessage: `태스트`,
      });
  } catch (error) {
    return res
      .status(400)
      .render("createPlaylist.pug", {
        title: "플레이리스트 만들기",
        errorMessage: `플레이리스트를 생성하는 과정에서 오류가 발생했습니다. ${error._message}`,
      });
  }
};
