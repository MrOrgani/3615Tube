import request from "request";
import fs from "fs";
import extract from "extract-zip";
import path from 'path'
import StreamZip from 'node-stream-zip';
import rimraf from 'rimraf';
import srt2vtt from "srt-to-vtt";
import mkdirp from "mkdirp";


export const downSub = (sub: any, imdbId: string) => {
  return new Promise(async function(resolve, reject) {
    mkdirp('./tmp/', function(err) { 
      if(err) { reject(err) }
      request(sub)
      .pipe(fs.createWriteStream(`./tmp/${imdbId}.zip`))
      .on('close', function () {
      console.log('File written!');
      resolve(`./tmp/${imdbId}.zip`)
      });
    });
  });
};

export const extSub = (zip: any) => {
  return new Promise(function(resolve, reject) {
      extract(zip, {dir: __dirname + '/../../tmp'}, function (err: any) {
          if(err) {
              reject(err)
          }
          const zipStream: any = new StreamZip({
            file: zip,
            storeEntries: true
          });
          zipStream.on('ready', () => {
            const file: any = Object.values(zipStream.entries())
            if(zipStream.entriesCount !== 1) { reject(new Error("BAD_SUBTITLE")) }
            zipStream.close()
            rimraf(zip,() => { console.log(`${zip} was removed.`) });
            resolve(file[0].name)
        });
      })
      
  });
};

export const convSub = (srt: any, imdbId: string, lang: string) => {
  return new Promise(function(resolve, reject) {
      fs.createReadStream(__dirname + '/../../tmp/' + srt)
      .pipe(srt2vtt())
      .pipe(fs.createWriteStream(__dirname + '/../../tmp/' + imdbId + "-" + lang + '.vtt'))
      rimraf(__dirname + '/../../tmp/' + srt, () => { console.log(`${__dirname + '/../../tmp/' + srt} was removed.`) });
      resolve()
  });
};