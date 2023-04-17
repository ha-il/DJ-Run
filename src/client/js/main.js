import "../scss/styles.scss";

const $createPlaylistButton = document.querySelector("#create-playlist-button");
const $recommendedTracksList = document.querySelector(
  "#recommended-tracks-list"
);
const $playlist = document.querySelector("#playlist");

const createPlaylist = async () => {
  const BASE_URL = "http://localhost:3000";
  const response = await fetch(`/api/playlist/common`);
  const data = await response.json();
  window.location.href = `${BASE_URL}/playlist/${data}`;
  return;
};

const addTrackToPlaylist = async (e) => {
  const playlist_id = $playlist.dataset.playlistId;
  if (e.target.classList.contains("add-track-to-playlist")) {
    const track_id = e.target.dataset.trackId;
    await fetch(`/api/${playlist_id}/${track_id}`, {
      method: "POST",
    });
    return;
  }
  return;
};

$createPlaylistButton.addEventListener("click", createPlaylist);
$recommendedTracksList.addEventListener("click", addTrackToPlaylist);
