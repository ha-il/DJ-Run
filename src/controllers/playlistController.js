import Track from "../models/Track.js";

export const getUserPlaylist = async (req, res) => {
  try {
    const tracks = await Track.find({});

    return res.render("home.pug", { title: "홈", tracks });
  } catch (error) {
    console.error(error);
  }
};
