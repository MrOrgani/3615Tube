import React, { useContext, useState, useEffect, useRef } from "react";
import { TorrentContext } from "../context";
import Skeleton from "@material-ui/lab/Skeleton";
// import { Grid } from "@material-ui/core";

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
  }, [srcTorrent]);
  return !src ? (
    <div
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
    </div>
  ) : (
    <video
      ref={video}
      style={{ height: "400px", width: "600px" }}
      id="videoPlayer"
      controls
    >
      <source
        src={`http://localhost:4000/video/${encodeURIComponent(src)}/${
          imdbId[2]
        }`}
        type="video/mp4"
      />
    </video>
  );
};
export default MoviePlayer;
