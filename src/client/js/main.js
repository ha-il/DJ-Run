import "../scss/styles.scss";
const $app = document.querySelector("#app");

const getPlaylist = async () => {
  const playlist_id = "4JbfsNrCYKds49Rr5uKRRt";
  const response = await fetch(
    `http://localhost:3000/api/playlist/${playlist_id}`
  );
  const playlistData = await response.json();
  return playlistData;
};

function formatMilliseconds(ms) {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

class App {
  constructor() {
    this.tracks = [];
    this.currentTrack = "";
    this.init();
    this.initEventListener();
  }
  init() {
    this.render();
    this.initEventListener();
  }

  initEventListener() {}

  async render() {
    const $player = document.querySelector("#player");
    const $trackList = document.querySelector("#track-list");
    const playlist = await getPlaylist();
    const tracks = playlist.tracks.items;
    this.tracks = tracks;
    this.currentTrack = tracks[0].track;
    const templatePlayer = `
      <image src=${this.currentTrack.album.images[1].url} />
      <div class="player-title">${this.currentTrack.name}</div>
      <div class="player-artist">${this.currentTrack.artists[0].name}</div>
    `;
    const templateTrackList = this.tracks
      .map((item) => {
        return `
        <li>
          <image src=${item.track.album.images[2].url} />
          <div class="track-container">
            <div>${item.track.name}</div>
            <div>${item.track.artists[0].name}</div>
          </div>
          <div>${formatMilliseconds(item.track.duration_ms)}</div>
        </li>
      `;
      })
      .join("");
    $player.innerHTML = templatePlayer;
    $trackList.innerHTML = templateTrackList;
  }
}

new App();

/*
id: "4JbfsNrCYKds49Rr5uKRRt"
images: (3) [{…}, {…}, {…}]
name: "🏃🏻‍♂️"
owner: 
{display_name: '김형우'}

tracks : {
  items: [
    {
      track: {
        album: {
          images: [{height: 640, url: "", width: 640}, {}]
        }
        artist: [{ name: "ALI" }, { name: "AKLO" }],
        duration_ms: 327966,
        name: "LOST IN PARADISE"
      }
    }
    {}
    {}
  ]
}
*/
