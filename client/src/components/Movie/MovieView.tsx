import React from "react";
import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieComments from "../MovieComments/MovieComments";

const MovieView = () =>
  // props: any
  {
    // console.log("MovieView Props, ", props);
    return (
      <>
        {/* <div style={{ color: "white", fontSize: "80px" }}>
        This is a movie page
      </div> */}
        <img className="video-player" src={videoPlayerImg} alt="video-player" />
        <TabsComponent
          tabsNames={["Information", "Comments"]}
          tabsToRender={[<MovieInfo />, <MovieComments />]}
        />
      </>
    );
  };

export default MovieView;
