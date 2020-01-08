import React from "react";
import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "../MovieInfo/MovieInfo";
// import CommentListItem from "../CommentListItem/CommentListItem";
import CommentConnector from "../Comments/CommentConnector";
import { Grid } from "@material-ui/core";
import MovieTorrents from "./MovieTorrents";
import { userInfo } from "os";

const MovieOneView = ({ movieInfo }: any) => {
  console.log(movieInfo);
  return (
    <>
      <Grid container xl={12} spacing={3}>
        {/**********************  PLAYER **********************************/}
        <Grid item container xl={6}>
          <img
            className="video-player"
            src={videoPlayerImg}
            alt="video-player"
          />
        </Grid>
        {/**********************  INFO ON THE MOVIE **********************************/}
        <Grid item xl={6} md={12} container>
          <MovieInfo data={movieInfo} />
        </Grid>
        {/**********************  TORRENTS **********************************/}
        <Grid item xl={6} md={12} container>
          {/* MOVIE MovieTorrents */}
          <MovieTorrents data={movieInfo} />
        </Grid>
        {/**********************  COMMENTS **********************************/}
        <Grid item xl={6} md={12} container>
          <CommentConnector />
          {/* Commentaires */}
        </Grid>
      </Grid>
    </>
  );
};

export default MovieOneView;
