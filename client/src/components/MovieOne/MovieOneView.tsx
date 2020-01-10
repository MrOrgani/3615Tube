import React from "react";
// import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
// import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "../MovieInfo/MovieInfo";
import CommentConnector from "../Comments/CommentConnector";
import { Grid } from "@material-ui/core";
import MovieTorrents from "./MovieTorrents";
import Skeleton from "@material-ui/lab/Skeleton";
import { userInfo } from "os";

const MovieOneView = ({ movieInfo, loading }: any) => {
  // console.log(movieInfo);
  const magnet =
    "magnet:?xt=urn:btih:A260FBC02AE0B4386677220BCCB18158512F5A0C&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337";
  return (
    <>
      {loading && (
        <Grid container xl={12} spacing={3}>
          {/**********************  PLAYER **********************************/}
          <Grid item container xl={6}>
            <video id="videoPlayer" controls style={{ width: "inherit" }}>
              <source
                // src={`http://localhost:4000/streaming/${magnet}`}
                type="video/mp4"
              />
            </video>
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
      )}
      {movieInfo && (
        <Grid container xl={12} spacing={3}>
          {/**********************  PLAYER **********************************/}
          <Grid item container xl={6} justify="center">
            <video id="videoPlayer" controls>
              <source
                src={`http://localhost:4000/streaming/${magnet}`}
                type="video/mp4"
              />
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
      )}
    </>
  );
};

export default MovieOneView;
