const VIMEO_ENDPOINT = "https://api.vimeo.com/me/videos";
const ACCESS_TOKEN = "e307d7b6fa503c44eb2a9d73ba3721b0"; // Replace with your access token

async function fetchVimeoVideos() {
  const response = await fetch(VIMEO_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch videos from Vimeo:", response.statusText);
    return [];
  }

  const data = await response.json();
  return data.data; // 'data' field contains the list of videos
}

fetchVimeoVideos().then((videos) => {
  const videoArray = videos.map((video) => {
    const { player_embed_url, name, embed, pictures } = video;
    console.log(video.name, video.link);

    const template = `<li role="button" class="port-item mix">
    <a href="portfolio-single1.html">
      <div class="port-img-overlay">
        <img
          class="port-main-img"
          src=${pictures.base_link}
          alt="img"
        />
      </div>
    </a>
    <div class="port-overlay-cont" onClick=redirectToVideo('${player_embed_url}')>
      <div class="port-title-cont">
        <h3>
          <a href="portfolio-single1.html">${name}</a>
        </h3>
        <span>
          <a href="video-page.html?player_embed_url=${player_embed_url}">${name}</a>
          <span class="slash-divider">/</span>
            <a href="#">media</a>
        </span>
      </div>
    </div>
  </li>`;
    return template;
  });
  const ul = `
  <ul
  class="port-grid display-hover-on-mobile port-grid-3 masonry clearfix">
 ${videoArray}</ul>`;
  console.log({ videoArray });
  const $itemGrid = $("#items-grid");
  $itemGrid.html(ul);
  initMasonry();
});

const redirectToVideo = (url) => {
  console.log("Redirect to video");
  var baseUrl = `video-page.html?player_embed_url=${url}`;
  window.location.href = baseUrl;
};
