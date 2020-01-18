import pump from "pump";
import parseRange from "range-parser";
import path from "path";
import ffmpeg from "fluent-ffmpeg";
import moment from "moment";
import rimraf from "rimraf";
import parseTorrent from "parse-torrent";
import { User } from "../entity/User";
import { Torrent } from "../entity/Torrent";
import { getConnection, LessThanOrEqual } from "typeorm";

export const startConvert = (file: any, res: any) => {
  if (file.type !== "mkv") {
    return;
  }
  let flux = file.createReadStream();
  /* Uncomment to see downloading logs */

  // let progressBar: number = 0;
  // flux.on("data", (chunk: any) => {
  //   progressBar += chunk.length;
  //   console.log(
  //     file.name + " : " + Math.round((100 * progressBar) / file.length) + "%"
  //   );
  // });
  ffmpeg(flux)
    .on("error", (err: any) => console.log(err))
    .audioBitrate(128)
    .audioCodec("libvorbis")
    .format("webm")
    .outputOptions([
      "-cpu-used 3",
      "-threads 4",
      "-deadline realtime",
      "-error-resilient 1"
    ])
    .videoBitrate(1024)
    .videoCodec("libvpx");
  res.writeHead(200, {
    "Cache-Control": "no-cache, no-store",
    "Content-Length": file.length,
    "Content-Type": "video/webm"
  });
  return pump(flux, res);
};

export const startStream = (file: any, req: any, res: any) => {
  res.setHeader("Content-Length", file.length);
  res.setHeader("Content-Type", `video/${file.type}`);
  const ranges: any = parseRange(file.length, req.headers.range, {
    combine: true
  });
  if (ranges === -1) {
    res.statusCode = 416;
    return res.end();
  } else {
    res.statusCode = 206;
    res.setHeader("Content-Length", 1 + ranges[0].end - ranges[0].start);
    res.setHeader(
      "Content-Range",
      `bytes ${ranges[0].start}-${ranges[0].end}/${file.length}`
    );
    let flux = file.createReadStream(ranges[0]);
    /* Uncomment to see downloading logs */
    // let progressBar: number = 0;
    // flux.on("data", (chunk: any) => {
    //   progressBar += chunk.length;
    //   console.log(
    //     file.name + " : " + Math.round((100 * progressBar) / file.length) + "%"
    //   );
    // });
    return pump(flux, res);
  }
};

export const getTorrentFile = (engine: any) => {
  return new Promise(function(resolve, _reject) {
    engine.on("ready", function() {
      engine.files.forEach(function(file: any) {
        const type = path.extname(file.name).slice(1);
        if (type === "mkv" || type === "mp4" || type === "webm") {
          file.type = type;
          resolve(file);
        }
      });
    });
  });
};

/* Parse and return Magnet URI from '.torrent'.*/
export const parseMagnet = (magnet: string) => {
  return new Promise(function(resolve, reject) {
    parseTorrent.remote(magnet, (err, parsedTorrent) => {
      if (err) reject(err);
      const uri = parseTorrent.toMagnetURI({
        infoHash: parsedTorrent?.infoHash
      });
      const torrent = {
        uri: uri,
        infoHash: parsedTorrent?.infoHash,
        trackers: parsedTorrent?.announce
      };
      resolve(torrent);
    });
  });
};

export const updateSeenFilms = (req: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = (await User.findOne(req.session.userId)) as User;
      if (user.seenFilms[0] === "[]") {
        user.seenFilms.shift();
      }
      if (user.seenFilms.indexOf(req.params.imdbId) === -1) {
        user.seenFilms.push(req.params.imdbId);
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set({
            seenFilms: user.seenFilms
          })
          .where("id = :id", { id: req.session.userId })
          .execute();
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteOldFilms = async () => {
  const oneMonthAgo = moment().subtract(1, "months");
  const oldTorrent = await Torrent.find({
    where: { createdAt: LessThanOrEqual(oneMonthAgo) }
  });
  for (const key in oldTorrent) {
    rimraf(`./downloads/${oldTorrent[key].infoHash}`, () => {
      console.log(`${oldTorrent[key].infoHash} was removed.`);
    });
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Torrent)
      .where("infoHash = :infoHash", { infoHash: oldTorrent[key].infoHash })
      .execute();
  }
};
