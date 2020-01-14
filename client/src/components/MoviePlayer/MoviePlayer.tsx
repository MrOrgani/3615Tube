import React, { useContext, useState, useEffect, useRef} from "react";
import { TorrentContext } from "../../pages/context";
const MoviePlayer = () => {
    const [srcTorrent] = useContext(TorrentContext) as any;
    const [src,setSrc] = useState(srcTorrent);
    const video = useRef(null) as any;
    const imdbId = document.location.pathname.split('/');
    useEffect(() => {
        setSrc(srcTorrent)
        if(video.current){
            video.current.load();
        }
    }, [srcTorrent])
    return(!src ? null :
        <video ref={video} style={{height: '400px', width:'600px'}} id="videoPlayer" controls>
            <source src={`http://localhost:4000/video/${encodeURIComponent(src)}/${imdbId[2]}`} type="video/mp4" />
        </video>
    )
}
export default MoviePlayer