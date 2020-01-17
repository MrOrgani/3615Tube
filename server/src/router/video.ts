import * as express from "express";
import * as torrentManager from "../scripts/torrentManager";
import * as subManager from "../scripts/subtitles";
import { Torrent } from "../entity/Torrent";
import torrentStream from "torrent-stream";
import yifySub from "yifysubtitles-api";
import { Film } from "../entity/Films";

const router = express.Router();

router.route("/sub/:imdbId").get(async (req: any, res: any) => {
  try {
    if (!req.session.user) {
      throw new Error("NOT_CONNECTED");
    }
    const language: string = req.session.user.language;
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.setHeader("Access-Control-Allow-Credentials", true);
    if (language !== "en" && language !== "fr" && language !== "es") {
      throw new Error("BAD_LANGUAGE");
    }
    const filmExist: any = await Film.findOne(req.params.imdbId);
    if (!filmExist) {
      throw new Error("FILM_DOES_NOT_EXIST");
    }
    yifySub
      .search({ imdbid: req.params.imdbId, limit: "best" })
      .then(async (sub: any) => {
        try {
          if (!sub.en) {
            throw new Error("NO_SUBTITLES_FOR_FILM");
          }
          if (sub.en) {
            const zip = await subManager.downSub(
              sub.en[0].url,
              req.params.imdbId
            ); // Download zip and return zip's path.
            const srt = await subManager.extSub(zip); // Extract zip path , remove the zip and return srt path.
            const vtt = await subManager.convSub(srt, req.params.imdbId, "en");
          }
          if (language === "fr" && sub.fr) {
            const zip = await subManager.downSub(
              sub.fr[0].url,
              req.params.imdbId
            ); // Download zip and return zip's path.
            const srt = await subManager.extSub(zip); // Extract zip path
            const vtt = await subManager.convSub(srt, req.params.imdbId, "fr");
          }
          if (language === "es" && sub.es) {
            const zip = await subManager.downSub(
              sub.es[0].url,
              req.params.imdbId
            ); // Download zip and return zip's path.
            const srt = await subManager.extSub(zip); // Extract zip path
            const vtt = await subManager.convSub(srt, req.params.imdbId, "es");
          }
          let oneLanguage = null;
          if ((sub.fr && language === "fr") || (sub.es && language === "es")) {
            oneLanguage = false;
          } else {
            oneLanguage = true;
          }
          const response: any = await subManager.getSubtitles(
            req.params.imdbId,
            language,
            oneLanguage
          );
          res.json(response);
        } catch (err) {
          if (err.message !== "NO_SUBTITLES_FOR_FILM") {
            console.log("ytssub, video.ts", err);
            res.status(400).end();
          } else {
            res.status(200).end();
          }
        }
      });
  } catch (err) {
    console.log("video.ts", err);
    res.status(400).end();
  }
});

router.route("/:magnet/:imdbId").get(async (req, res) => {
  try {
    if (!req.session) {
      throw new Error("NOT_CONNECTED");
    }
    if (req.headers.range === "bytes=0-") {
      torrentManager.updateSeenFilms(req);
    }
    const magnet: any = await torrentManager.parseMagnet(req.params.magnet);
    const engine = torrentStream(magnet.uri, {
      path: `./downloads/${magnet.infoHash}`,
      verify: true,
      trackers: magnet.trackers
    });
    const file: any = await torrentManager.getTorrentFile(engine);
    const findTorrent = await Torrent.findOne({
      where: { infoHash: magnet.infoHash }
    });
    if (!findTorrent) {
      const newDbTorrent = new Torrent();
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
