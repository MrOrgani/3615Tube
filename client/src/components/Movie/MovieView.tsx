import React from "react";
// import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "../MovieInfo/MovieInfo";
// import CommentListItem from "../CommentListItem/CommentListItem";
import CommentConnector from "../Comment/CommentConnector";

const MovieView = ({ movieInfo }: any) => {
  return (
    <>
      {/* <img className="video-player" src={videoPlayerImg} alt="video-player" /> */}
      <TabsComponent
        tabsNames={["Information", "Comments"]}
        tabsToRender={[<MovieInfo data={movieInfo} />, <CommentConnector />]}
      />
    </>
  );
};

export default MovieView;
