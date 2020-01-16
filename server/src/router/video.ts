import * as express from "express";
import * as torrentManager from "../scripts/torrentManager";
import * as subManager from "../scripts/subtitles"
import {Torrent} from '../entity/Torrent'
import torrentStream from "torrent-stream";
import yifySub from 'yifysubtitles-api';


const router = express.Router();

/* 
 TO DO : 
 - Update movies seens user
 - Parse/handle error Magnet and torrent file 
 - CronJob
 - torrent entity
*/
router.route('/sub/:imdbId').get(async (req: any, res: any) => {
  try{
    console.log('ON ENTRE');
  yifySub.search({imdbid: req.params.imdbId,limit:'best'}).then(async (sub: any) => {
      /*nb sub a faire */
    console.log("IMDBID==>", req.params.imdbId)
    // const language: any = req.session.language;
    const language:string = "fr"; // FOR TESTING
    console.log(sub.en[0])
    if(sub.en[0].url) {
      const zip = await subManager.downSub(sub.en[0].url, req.params.imdbId) // Download zip and return zip's path.
      const srt = await subManager.extSub(zip) // Extract zip path , remove the zip and return srt path.
      const vtt = await subManager.convSub(srt, req.params.imdbId, "en");
    }
    if (language === "fr" && sub.fr[0].url) {
      const zip = await subManager.downSub(sub.fr[0].url, req.params.imdbId) // Download zip and return zip's path.
      const srt = await subManager.extSub(zip) // Extract zip path
      const vtt = await subManager.convSub(srt,req.params.imdbId, "fr");
    }
    if (language === "es" && sub.es[0].url) {
      const zip = await subManager.downSub(sub.es[0].url, req.params.imdbId) // Download zip and return zip's path.
      const srt = await subManager.extSub(zip) // Extract zip path
      const vtt = await subManager.convSub(srt, req.params.imdbId, "es");
    }
    /* supprimer srt / vtt ??? */
  })
  res.end(); // for testing REMOVE THAT SHIT AFTER PLEASE
  }catch(err){
    console.log(err);
  }
})

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
