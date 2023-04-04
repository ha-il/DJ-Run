export const Music = (music) => `
  <li>
    <div>${music.rank}위 ${music.title} : ${music.creator}</div>
  </li>`;
export const Musics = (musics) => `
  <ul>
    ${musics.map(Music).join("")}
  </ul>
`;

export const Home = (musics) => `
  ${Musics(musics)}
`;

export const DefaultLayout = (children) => `
  <main>
    <h1>인기 차트</h1>
    <header>
      <nav>
        <a href="/">메인페이지</a>
        <a href="/sub">서브페이지</a>
      </nav>
    </header>
    <section style="margin: 30px 0">
      ${children}
    </section>
    <footer>
      <p>Copyright &copy; 2023 김형우</p
    </footer>
  </main>
`;

export const App = (path, model) => {
  if (path === "/") {
    return DefaultLayout(Home(model.musics));
  } else if (path === "/sub") {
    return DefaultLayout(`<p>서브페이지 입니다.</p>`);
  } else {
    return DefaultLayout(`<p>404</p>`);
  }
};
