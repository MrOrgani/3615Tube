import React, { useContext, useState, useEffect, useRef } from "react";
import { TorrentContext } from "../context";
import Skeleton from "@material-ui/lab/Skeleton";
import { Container } from "@material-ui/core";
// import { Grid } from "@material-ui/core";
import axios from "axios";

const MoviePlayer = () => {
  const [srcTorrent] = useContext(TorrentContext) as any;
  const [src, setSrc] = useState(srcTorrent);
  const [subtitles, setSubtitles]: any = useState("");
  const [favLanguage, setFavLanguage]: any = useState("en");
  const video = useRef(null) as any;
  const imdbId = document.location.pathname.split("/");
  const getSubtitles = async () => {
    try {
      console.log("ON ENTRE TRY");
      const res = await axios.get(
        `http://localhost:4000/video/sub/${imdbId[2]}`,
        { withCredentials: true }
      );
      const favLanguage = Object.keys(res.data);
      if (favLanguage[1]) {
        console.log("favLanguage", favLanguage[1]);
        console.log("RESPONSE", res.data);
        setFavLanguage(favLanguage[1]);
      }
      setSubtitles(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setSrc(srcTorrent);
    if (video.current) {
      video.current.load();
    }
  }, [srcTorrent, video]); //remove video if bug here

  useEffect(() => {
    if(src){
      getSubtitles()
    }
  }, [src])

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
