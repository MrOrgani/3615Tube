import React, { useContext, useState, useEffect, useRef } from "react";
import { TorrentContext } from "../context";
import axios from 'axios';

const MoviePlayer = () => {
  const [srcTorrent] = useContext(TorrentContext) as any;
  const [src, setSrc] = useState(srcTorrent);
  const video = useRef(null) as any;
  const imdbId = document.location.pathname.split("/");
  const getSubtitles = async () => {
    try{
      console.log('ON ENTRE TRY')
      await axios.get(`http://localhost:4000/video/sub/${imdbId[2]}`);
    } catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    setSrc(srcTorrent);
    if (video.current) {
      video.current.load();
    }
  }, [srcTorrent]);
  useEffect(() => {
    if(src){
      getSubtitles()
    }
  }, [src])
  return !src ? null : (
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
      <track kind="subtitles" label="English" src={`http://localhost:4000/${imdbId[2]}-en.vtt`} />
    </video>
  );
};
export default MoviePlayer;
