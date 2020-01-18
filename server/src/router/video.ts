import * as express from "express";
import * as torrentManager from "../scripts/torrentManager";
import * as subManager from "../scripts/subtitles";
import { Torrent } from "../entity/Torrent";
import torrentStream from "torrent-stream";
import yifySub from "yifysubtitles-api";
import { Film } from "../entity/Films";
// import * as URL from "url";

const router = express.Router();

router.route("/sub/:imdbId").get(async (req: any, res: any) => {
  req.setTimeout(1000 * 10, () => req.abort());
  res.on("end", () => req.abort());
  try {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.setHeader("Access-Control-Allow-Credentials", true);
    if (!req.session.user) {
      throw new Error("NOT_CONNECTED");
    }
    const language: string = req.session.user.language;
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
        const prepareSub = async (lan: string) => {
          const zip = await subManager.downSub(
            sub[lan][0].url,
            req.params.imdbId
          );
          const srt = await subManager.extSub(zip, req.params.imdbId, lan);
          const vtt = await subManager.convSub(srt, req.params.imdbId, lan);
        };
        try {
          if (!sub.en) {
            throw new Error("NO_SUBTITLES_FOR_FILM");
          }
          if (sub.en) await prepareSub("en");
          if (language === "fr" && sub.fr) await prepareSub("fr");
          if (language === "es" && sub.es) await prepareSub("es");
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
    console.log("SUBROUTE=>", err);
    res.status(400).end();
  }
});

router.route("/:magnet/:imdbId").get(async (req, res) => {
  try {
    if (!req.session!.user) {
      throw new Error("NOT_CONNECTED");
    }
    if (req.headers.range === "bytes=0-") {
      torrentManager.updateSeenFilms(req);
    }
    const magnet: any = await torrentManager.parseMagnet(req.params.magnet);
    // Encode all trackers URL
    const regex = RegExp(
      "^[A-Za-z0-9 \\r\\n@£$¥èéùìòÇØøÅå\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!\"#$%&'()*+,\\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\\\\[~\\]|\u20AC]*$"
    );
    for (const key in magnet.trackers) {
      magnet.trackers[key].split("").forEach((letter: string) => {
        if (!regex.test(letter))
          magnet.trackers[key] = encodeURIComponent(magnet.trackers[key]);
      });
    }
    const engine = torrentStream(magnet.uri, {
      connections: 100,
      uploads: 10,
      path: `./downloads/${magnet.infoHash}`,
      verify: true,
      trackers: magnet.trackers
    });
    //BLOCK AN IP THAT MAD US CRASH
    engine.block("104.26.15.136:80");
    engine.block("104.26.14.136:443");
    const file: any = await torrentManager.getTorrentFile(engine);
    //LISTEN FOR CLIENT ORIGNIATED RESPONSE CLOSE TO AVOID A FRONT CRASH ON FIREFOX
    res.on("close", () => {
      engine.remove(true, () => {
        engine.destroy(() => {});
      });
    });
    //FIND THE TORRENT IN THE DB OR CREATE ONE
    const findTorrent = await Torrent.findOne({
      where: { infoHash: magnet.infoHash }
    });
    if (!findTorrent) {
      const newDbTorrent = new Torrent();
      newDbTorrent.infoHash = magnet.infoHash;
      newDbTorrent.save();
    }
    //START THESTREAM
    if (file.type === "mp4" || file.type === "webm") {
      torrentManager.startStream(file, req, res);
    } else if (file.type === "mkv") {
      torrentManager.startConvert(file, res);
    } else {
      throw new Error("BAD_EXTENSION");
    }
  } catch (err) {
    console.log("VIDEOROUTE==>", err);
    res.end();
  }
});

module.exports = router;
