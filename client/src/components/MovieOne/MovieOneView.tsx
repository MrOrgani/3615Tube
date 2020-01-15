import React, { useState } from "react";
// import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
// import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "./MovieInfo";
import CommentConnector from "../Comments/CommentConnector";
import { Grid } from "@material-ui/core";
import MovieTorrents from "./MovieTorrents";
import Skeleton from "@material-ui/lab/Skeleton";
import { TorrentProvider } from "../context";
import MoviePlayer from "../MoviePlayer/MoviePlayer";

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
  const [srcTorrent, setSrcTorrent] = useState("");
  return (
    <>
      {movieInfo && (
        <TorrentProvider value={[srcTorrent, setSrcTorrent]}>
          <Grid container xl={12} spacing={3}>
            {/**********************  PLAYER **********************************/}
            <Grid item container xl={6} justify="center">
              <MoviePlayer />
            </Grid>
            {/**********************  INFO ON THE MOVIE **********************************/}
            <Grid item xl={6} md={12} container>
              <MovieInfo movieInfo={movieInfo} />
            </Grid>
            {/**********************  TORRENTS **********************************/}
            <Grid item xl={6} md={12} container alignItems="flex-start">
              <MovieTorrents data={movieInfo} />
            </Grid>
            {/**********************  COMMENTS **********************************/}
            <Grid
              item
              xl={6}
              md={12}
              container
              style={{ height: "40vh", overflow: "auto" }}
            >
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
