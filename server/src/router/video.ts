import * as express from "express";
import * as torrentManager from "../scripts/torrentManager";
import fs from "fs";
import torrentStream from 'torrent-stream'
const router = express.Router();

/* 
 TO DO : 
 - Update movies seens user
 - Parse/handle error Magnet and torrent file 
 - CronJob
 - torrent entity
*/
router.route("/:magnet").get(async (req, res) => {
  try{
      console.log("PARAMSMAGNET=>", req.params.magnet)
      const magnet: any = await torrentManager.parseMagnet(req.params.magnet);
    // ==> Have to verify magnet here
      const engine = torrentStream(magnet.uri,{path: './downloads/', verify: true , trackers: magnet.trackers});
      const file: any = torrentManager.isDownloaded(magnet) || await torrentManager.getTorrentFile(engine);
      if(file.type === 'mp4' || file.type === 'webm'){
        console.log('===>NORMAL STREAM<====');
        torrentManager.startStream(file,req,res);
      } else if(file.type === 'mkv'){
        console.log('===>CONVERT STREAM<====');
        torrentManager.startConvert(file,res);
      } else { throw new Error('BAD_EXTENSION') };
    } catch(err){
    console.log('ERR==>', err);
    res.end();
  }
});

module.exports = router;
