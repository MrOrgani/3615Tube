import React from "react";
// import MovieList from "../../components/movie-list/movie-list.component";
import "./homepage.styles.scss";

// const TestingVideoConversion = () => {
//   const mandalorian = "magnet:?xt=urn:btih:853f3361287638373cffa51fd77fb01bc0b0360e&dn=The.Mandalorian.S01E02.1080p.D%2B.WEB-DL.x264-Rapta&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969";
//   const fakeImdbId = "tt8111088";
//   return (
//     <video
//     style={{ height: "400px", width: "600px" }}
//     id="videoPlayer"
//     controls
//   >
//     <source
//       src={`http://localhost:4000/video/${encodeURIComponent(mandalorian)}/${fakeImdbId}`}
//       type="video/mp4"
//     />
//   </video>
//   )
// }
const HomePage = () => {
  return (
    <div className="homepage">
      This is the Homepage
      {/* <TestingVideoConversion /> */}
      {/* <MovieList /> */}
    </div>
  );
};

export default HomePage;
