import React from "react";
// import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
// import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "../MovieInfo/MovieInfo";
import CommentConnector from "../Comments/CommentConnector";
import { Grid } from "@material-ui/core";
import MovieTorrents from "./MovieTorrents";
import Skeleton from "@material-ui/lab/Skeleton";
import { TorrentProvider } from "../../pages/context";

const MovieOneSkeleton = (
  <Grid container xl={12} spacing={3}>
    {/**********************  PLAYER **********************************/}
    <Grid item container xl={6}>
      <video id="videoPlayer" controls style={{ width: "inherit" }}></video>
    </Grid>
    {/**********************  INFO ON THE MOVIE **********************************/}
    <Grid item xl={6} md={12} container>
      <Skeleton
        variant="rect"
        width={185}
        height={278}
        style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
      />
    </Grid>
    {/**********************  TORRENTS **********************************/}
    <Grid item xl={6} md={12} container>
      <Skeleton
        variant="rect"
        width={185}
        height={278}
        style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
      />
    </Grid>
    {/**********************  COMMENTS **********************************/}
    <Grid item xl={6} md={12} container>
      <Skeleton
        variant="rect"
        width={185}
        height={278}
        style={{ backgroundColor: "rgba(222, 85, 257, 0.08)" }}
      />
    </Grid>
  </Grid>
);

const MovieOneView = ({ movieInfo, loading }: any) => {
  console.log("Movie One view", movieInfo);
  return (
    <>
      {movieInfo && (
        <TorrentProvider value={""}>
          <Grid container xl={12} spacing={3}>
            {/**********************  PLAYER **********************************/}
            <Grid item container xl={6} justify="center">
              <video id="videoPlayer" controls>
                {/* <source
                src={`http://localhost:4000/streaming/${magnet}`}
                type="video/mp4"
              /> */}
              </video>
            </Grid>
            {/**********************  INFO ON THE MOVIE **********************************/}
            <Grid item xl={6} md={12} container>
              <MovieInfo data={movieInfo} />
            </Grid>
            {/**********************  TORRENTS **********************************/}
            <Grid item xl={6} md={12} container>
              <MovieTorrents data={movieInfo} />
            </Grid>
            {/**********************  COMMENTS **********************************/}
            <Grid item xl={6} md={12} container>
              <CommentConnector />
            </Grid>
          </Grid>
        </TorrentProvider>
      )}
      {/* IF LOADING */}
      {loading && MovieOneSkeleton}
    </>
  );
};

export default MovieOneView;
