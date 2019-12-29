import React from "react";
import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";

const MovieView = (props: any) => {
  console.log("MovieView Props, ", props);
  return (
    <>
      {/* <div style={{ color: "white", fontSize: "80px" }}>
        This is a movie page
      </div> */}
      <img className="video-player" src={videoPlayerImg} alt="video-player" />
      <div className="player-info">All the info that i need</div>
    </>
  );
};

export default MovieView;
