import request from "request";
import fs, { write } from "fs";
import extract from "extract-zip";
import path from "path";
import StreamZip from "node-stream-zip";
import rimraf from "rimraf";
import srt2vtt from "srt-to-vtt";
import mkdirp from "mkdirp";
import { rejects } from "assert";

export const downSub = (sub: any, imdbId: string) => {
  return new Promise(async function(resolve, reject) {
    mkdirp("./tmp/", function(err) {
      if (err) return reject(err);
      request(sub)
        .pipe(fs.createWriteStream(`./tmp/${imdbId}.zip`))
        .on("close", function() {
          resolve(`./tmp/${imdbId}.zip`);
        });
    });
  });
};

export const extSub = (zip: any, imdbId: string, lan: string) => {
  return new Promise(function(resolve, reject) {
    extract(zip, { dir: __dirname + "/../../tmp" }, function(err: any) {
      if (err) return reject(err);
      const zipStream: any = new StreamZip({
        file: zip,
        storeEntries: true
      });

      zipStream.on("ready", () => {
        const file: any = Object.values(zipStream.entries());
        if (path.extname(file[0].name).substr(1) !== "srt") {
          reject(new Error("BAD_SUBTITLE"));
        }
        zipStream.close();
        resolve(file[0].name);
      });
    });
  });
};

export const convSub = (srt: any, imdbId: string, lang: string) => {
  return new Promise(function(resolve, reject) {
    const srtPath = __dirname + "/../../tmp/" + srt;
    fs.access(srtPath, fs.constants.F_OK, (err) =>{
      if(err){ return reject(new Error('BAD_SUBTITLES')) }
      const writestream = fs.createWriteStream(
        __dirname + "/../../tmp/" + imdbId + "-" + lang + ".vtt"
      );
      fs.createReadStream(srtPath)
        .pipe(srt2vtt())
        .pipe(writestream);
      writestream.on("finish", () => {
        // rimraf(__dirname + '/../../tmp/' + srt, () => { console.log(`${__dirname + '/../../tmp/' + srt} was removed.`) });
        resolve();
      });
    })
  });
};

export const getSubtitles = (
  imdbId: string,
  language: string,
  oneLanguage: boolean
) => {
  return new Promise(async (resolve, reject) => {
    const response: any = {
      en: ""
    };
    const path = __dirname + `/../../tmp/${imdbId}-en.vtt`;
    const languagePath = __dirname + `/../../tmp/${imdbId}-${language}.vtt`;
    fs.access(path, fs.constants.F_OK, err => {
      if (err) return reject(new Error("ERR_PATH"));
      else {
        fs.readFile(path, "utf8", (err, data) => {
          if (err) return reject(err);
          const base64data = Buffer.from(data);
          response.en = base64data.toString("base64");
          if (language === "en") {
            resolve(response);
          }
          if (oneLanguage === false) {
            fs.access(languagePath, fs.constants.F_OK, err => {
              // console.log(path)
              if (err) return reject(new Error("ERR_PATH"));
              else {
                fs.readFile(languagePath, "utf8", (err, data) => {
                  if (err) return reject(err);
                  const base64data = Buffer.from(data);
                  response[language] = base64data.toString("base64");
                  resolve(response);
                });
              }
            });
          } else {
            resolve(response);
          }
        });
      }
    });
  });
};
