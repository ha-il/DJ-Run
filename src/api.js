const getToken = async () => {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  });

  const data = await response.json();

  return data.access_token;
};

export const getPlaylist = async () => {
  const playlist_id = "4JbfsNrCYKds49Rr5uKRRt";
  const token = await getToken();
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}
  `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  return data;
};
