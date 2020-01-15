import * as express from "express";
import * as torrentManager from "../scripts/torrentManager";
import {Torrent} from '../entity/Torrent'
import torrentStream from "torrent-stream";
const router = express.Router();

/* 
 TO DO : 
 - Update movies seens user
 - Parse/handle error Magnet and torrent file 
 - CronJob
 - torrent entity
*/
router.route("/:magnet/:imdbId").get(async (req, res) => {
  try {
    if(!req.session) { throw new Error('NOT_CONNECTED') };
    if(req.headers.range === "bytes=0-"){
      torrentManager.updateSeenFilms(req);
    }
    const magnet: any = await torrentManager.parseMagnet(req.params.magnet);
    const engine = torrentStream(magnet.uri, {
      path: `./downloads/${magnet.infoHash}`,
      verify: true,
      trackers: magnet.trackers
    });
    const file: any = await torrentManager.getTorrentFile(engine);
    const findTorrent = await Torrent.findOne({where: {infoHash: magnet.infoHash}})
    if(!findTorrent){
      const newDbTorrent = new Torrent;
      newDbTorrent.infoHash = magnet.infoHash;
      newDbTorrent.save();
    }
    if (file.type === "mp4" || file.type === "webm") {
      torrentManager.startStream(file, req, res);
    } else if (file.type === "mkv") {
      torrentManager.startConvert(file, res);
    } else {
      throw new Error("BAD_EXTENSION");
    }
  } catch (err) {
    console.log("ERR==>", err);
    res.end();
  }
});

module.exports = router;
