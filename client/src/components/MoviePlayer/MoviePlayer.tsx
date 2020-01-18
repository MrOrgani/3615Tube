import React, { useContext, useState, useEffect, useRef } from "react";
import { TorrentContext } from "../context";
import Skeleton from "@material-ui/lab/Skeleton";
import { Container } from "@material-ui/core";
// import { Grid } from "@material-ui/core";
import axios from "axios";

declare global {
  interface Window {
    chrome: any;
  }
}

const MoviePlayer = () => {
  const [srcTorrent] = useContext(TorrentContext) as any;
  const [src, setSrc] = useState(srcTorrent);
  const [subtitles, setSubtitles]: any = useState("");
  const [favLanguage, setFavLanguage]: any = useState("en");
  const video = useRef(null) as any;

  useEffect(() => {
    let isSubscribed = true;
    const getSubtitles = async () => {
      const imdbId = document.location.pathname.split("/");
      // console.log('==>GET SUBTITLES<==')
      try {
        const res = await axios.get(
          `http://127.0.0.1:4000/video/sub/${imdbId[2]}`,
          { withCredentials: true }
        );
        const favLanguage = Object.keys(res.data);
        if (favLanguage[1]) {
          isSubscribed && setFavLanguage(favLanguage[1]);
        }
        isSubscribed && setSubtitles(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    getSubtitles();
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    isSubscribed && setSrc(srcTorrent);
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line
  }, [srcTorrent]); //remove video if bug here

  useEffect(() => {
    const isChrome: any = !!window.chrome;
    if (video.current) {
      if (isChrome) {
        video.current.load();
      }
    }
    // eslint-disable-next-line
  }, [src]);

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
          document.location.pathname.split("/")[2]
        }`}
        type="video/mp4"
      />
      {subtitles.en ? (
        <track
          kind="subtitles"
          label="English"
          src={`data:text/vtt;base64, ${subtitles.en}`}
        />
      ) : null}
      {favLanguage !== "en" && subtitles[favLanguage] ? (
        <track
          kind="subtitles"
          label={favLanguage === "es" ? "Spanish" : "French"}
          src={`data:text/vtt;base64, ${subtitles[favLanguage]}`}
        />
      ) : null}
    </video>
  );
};
export default MoviePlayer;
