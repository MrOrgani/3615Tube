import React, { useContext, useState, useEffect, useRef } from "react";
import { TorrentContext } from "../context";
import axios from 'axios';

/* 
  CHECK SUBTITLES UNDEFINED 
*/
const MoviePlayer = () => {
  const [srcTorrent] = useContext(TorrentContext) as any;
  const [src, setSrc] = useState(srcTorrent);
  const [subtitles, setSubtitles]: any = useState("");
  const [favLanguage, setFavLanguage]: any = useState('en');
  const video = useRef(null) as any;
  const imdbId = document.location.pathname.split("/");
  const getSubtitles = async () => {
    try{
      console.log('ON ENTRE TRY')
      const res = await axios.get(`http://localhost:4000/video/sub/${imdbId[2]}`, {withCredentials: true});
      const favLanguage = Object.keys(res.data);
      if(favLanguage[1]){
        console.log('favLanguage', favLanguage[1]);
        console.log('RESPONSE', res.data);
        setFavLanguage(favLanguage[1])
      }
      setSubtitles(res.data)
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
      { subtitles.en ?
        <track kind="subtitles" 
          label="English" 
          src={`data:text/vtt;base64, ${subtitles.en}`} 
        />
        : null
      }
      { favLanguage !== 'en' && subtitles[favLanguage] ?
        <track kind="subtitles" 
          label={favLanguage === 'es' ? 'Spanish' : 'French'} 
          src={`data:text/vtt;base64, ${subtitles[favLanguage]}`} 
        />
        : null
      }
    </video>
  );
};
export default MoviePlayer;
