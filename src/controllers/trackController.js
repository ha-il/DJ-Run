import Track from "../models/Track.js";

export const renderHomepage = async (req, res) => {
  const tracks = await Track.find({});
  res.render("home.pug", { title: "홈", tracks });
};

export const renderUploadTrackPage = (req, res) => {
  res.render("uploadTrack.pug", { title: "트랙 등록하기" });
};

export const uploadTrack = async (req, res) => {
  const { name, artists } = req.body;
  try {
    await Track.create({
      name,
      artists: artists.split(","),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("uploadTrack.pug", {
      title: "트랙 등록하기",
      errorMessage: error._message,
    });
  }
};
