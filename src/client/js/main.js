import "../scss/styles.scss";

const topHeader = document.querySelector("#top-header");

const changeHeaderBackgroundColor = () => {
  const browserScrollY = window.scrollY;
  if (browserScrollY > 0) {
    topHeader.classList.add("header-scroll-active");
  } else {
    topHeader.classList.remove("header-scroll-active");
  }
};

window.addEventListener("scroll", changeHeaderBackgroundColor);
