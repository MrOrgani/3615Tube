import React from "react";
import videoPlayerImg from "../../assets/images/LecteurToSuppr.png";
import TabsComponent from "../Tabs/TabsComponent";
import MovieInfo from "../MovieInfo/MovieInfo";
// import CommentListItem from "../CommentListItem/CommentListItem";
import CommentConnector from "../Comments/CommentConnector";
import { Grid } from "@material-ui/core";

const MovieOneView = ({ movieInfo }: any) => {
  const magnet = "magnet:?xt=urn:btih:A260FBC02AE0B4386677220BCCB18158512F5A0C&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
  return (
    <>
      <Grid container xl={12}>
        <Grid item container xl={10}>
          <video id="videoPlayer" controls>
            <source src={`http://localhost:4000/streaming/${magnet}`} type="video/mp4" />
          </video>
        </Grid>
        <Grid item container xl={2}>
          <MovieInfo data={movieInfo} />
        </Grid>
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
