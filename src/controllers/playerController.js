export const getToken = async (req, res) => {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  const data = await response.json();
  const token = data.access_token;
  return token;
};

export const getPlaylist = async (req, res) => {
  const accessToken = await getToken();
  const playlist_id = req.params.playlist_id;
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}`,
    {
      headers: { Authorization: `Bearer  ${accessToken}"` },
    }
  );
  const playlistData = await response.json();
  return res.send(playlistData);
};
