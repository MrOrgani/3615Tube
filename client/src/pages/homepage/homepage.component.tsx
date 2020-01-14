import React from "react";
// import MovieList from "../../components/movie-list/movie-list.component";

import "./homepage.styles.scss";

const HomePage = () => {
  const mandalorian = encodeURIComponent(
    "magnet:?xt=urn:btih:853f3361287638373cffa51fd77fb01bc0b0360e&dn=The.Mandalorian.S01E02.1080p.D%2B.WEB-DL.x264-Rapta&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969"
  );
  // const batman = encodeURIComponent(
  //   "magnet:?xt=urn:btih:A260FBC02AE0B4386677220BCCB18158512F5A0C&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  // );
  return (
    <div className="homepage">
      This is the Homepage
      <video
        style={{ height: "400px", width: "600px" }}
        id="videoPlayer"
        controls
      >
        <source
          src={`http://localhost:4000/video/${mandalorian}`}
          type="video/mp4"
        />
      </video>
      {/* <MovieList /> */}
    </div>
  );
};

export default HomePage;
