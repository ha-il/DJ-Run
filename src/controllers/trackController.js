import Playlist from "../models/Playlist.js";
import Track from "../models/Track.js";

export const renderChartPage = async (req, res) => {
  try {
    const tracks = await Track.find({}).sort({ likeCount: -1 }).limit(20);
    if (!tracks) {
      return res.status(404).render("chart.pug", {
        title: "인기 차트",
        errorMessage:
          "등록된 트랙을 조회할 수 없어서 차트를 표시할 수 없습니다.",
      });
    }
    return res.status(200).render("chart.pug", {
      tracks,
      title: "인기 차트",
    });
  } catch (error) {
    return res.status(400).render("chart.pug", {
      title: "인기 차트",
      errorMessage: `차트를 불러오는 과정에서 오류가 발생했습니다. ${error._message}`,
    });
  }
};

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
