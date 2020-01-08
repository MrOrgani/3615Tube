import React from "react";
import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "../MovieInfo/MovieInfo";
// import CommentListItem from "../CommentListItem/CommentListItem";
import CommentConnector from "../Comments/CommentConnector";
import { Grid } from "@material-ui/core";

const MovieOneView = ({ movieInfo }: any) => {
  return (
    <>
      <Grid container xl={12}>
        <Grid item container xl={10}>
          <img
            className="video-player"
            src={videoPlayerImg}
            alt="video-player"
          />
        </Grid>
        {/* <Grid item container xl={2}> */}
        <MovieInfo data={movieInfo} />
        {/* </Grid> */}
        <CommentConnector />
        {/* <TabsComponent
        tabsNames={["Information", "Comments"]}
        tabsToRender={[<MovieInfo data={movieInfo} />, <CommentConnector />]}
      /> */}
      </Grid>
    </>
  );
};

export default MovieOneView;
