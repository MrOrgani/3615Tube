import React, { useContext, useState, useEffect, useRef} from "react";
import { TorrentContext } from "../../pages/context";
const MoviePlayer = () => {
    const [srcTorrent] = useContext(TorrentContext) as any;
    const [src,setSrc] = useState(srcTorrent);
    const video = useRef(null) as any;
    useEffect(() => {
        console.log("=====>SRC<=====", src);
    }, [src])
    useEffect(() => {
        setSrc(srcTorrent)
        if(video.current){
            video.current.load();
        }
    }, [srcTorrent])
    return(!src ? null :
        <video ref={video} style={{height: '400px', width:'600px'}} id="videoPlayer" controls autoPlay>
            <source src={`http://localhost:4000/video/${encodeURIComponent(src)}`} type="video/mp4" />
        </video>
    )
}
export default MoviePlayer