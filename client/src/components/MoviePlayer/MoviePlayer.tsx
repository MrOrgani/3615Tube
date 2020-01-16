import React, { useContext, useState, useEffect, useRef } from "react";
import { TorrentContext } from "../context";
import Skeleton from "@material-ui/lab/Skeleton";
import { Container } from "@material-ui/core";
// import { Grid } from "@material-ui/core";
import axios from "axios";

const MoviePlayer = () => {
  const [srcTorrent] = useContext(TorrentContext) as any;
  const [src, setSrc] = useState(srcTorrent);
  const video = useRef(null) as any;
  const imdbId = document.location.pathname.split("/");

  useEffect(() => {
    setSrc(srcTorrent);
    if (video.current) {
      video.current.load();
    }
  }, [srcTorrent, video]);
  useEffect(() => {
    const getSubtitles = async () => {
      try {
        console.log("ON ENTRE TRY");
        await axios.get(`http://127.0.0.1:4000/video/sub/${imdbId[2]}`);
      } catch (err) {
        console.log(err);
      }
    };
    if (src) {
      getSubtitles();
    }
  }, [src, imdbId]);
  return !src ? (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Skeleton variant="rect" width={600} height={400} />
      <h5 style={{ position: "absolute", color: "white" }}>
        Please, click on a torrent to start streaming
      </h5>
    </Container>
  ) : (
    <video
      ref={video}
      style={{ height: "400px", width: "600px" }}
      id="videoPlayer"
      controls
    >
      <source
        src={`http://127.0.0.1:4000/video/${encodeURIComponent(src)}/${
          imdbId[2]
        }`}
        type="video/mp4"
      />
      <track
        kind="subtitles"
        label="English"
        src={`http://127.0.0.1:4000/${imdbId[2]}-en.vtt`}
      />
    </video>
  );
};
export default MoviePlayer;
