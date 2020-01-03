import React from "react";
import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "../MovieInfo/MovieInfo";
import CommentListSkeleton from "../comment-list-skeleton/CommentListSkel";

const MovieView = () => {
  return (
    <>
      <img className="video-player" src={videoPlayerImg} alt="video-player" />
      <TabsComponent
        tabsNames={["Information", "Comments"]}
        tabsToRender={[<MovieInfo />, <CommentListSkeleton />]}
      />
    </>
  );
};

export default MovieView;
