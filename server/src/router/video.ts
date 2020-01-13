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
      const magnet = req.params.magnet;
    // ==> Have to verify magnet here
      const engine = torrentStream(magnet,{path: './downloads/', verify: true });
      const file: any = torrentManager.isDownloaded(magnet) || await torrentManager.getTorrentFile(engine);
      if(file.type === 'mp4' || file.type === 'webm'){
        torrentManager.startStream(file,req,res);
      } else if(file.type === 'mkv'){
        torrentManager.startConvert(file,res);
      } else { throw new Error('BAD_EXTENSION') };
    } catch(err){
    console.log('ERR==>', err);
    res.end();
  }
});

module.exports = router;
