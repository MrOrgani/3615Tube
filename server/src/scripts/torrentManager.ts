import torrentStream from 'torrent-stream'
import pump from 'pump'
import parseRange from 'range-parser'
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'

/* https://stackoverflow.com/questions/20665982/convert-videos-to-webm-via-ffmpeg-faster */
export const startConvert = (file: any, res: any) => {
	if(file.type !== 'mkv'){ return }
	let flux = file.createReadStream()
	ffmpeg(flux)
	.on('error', (err: any) => console.log(err) )
	.audioBitrate(128)
	.audioCodec('libvorbis')
	.format('webm')
	.outputOptions([
		'-cpu-used 3',
		'-threads 4',
		'-deadline realtime',
		'-error-resilient 1'
	])
	.videoBitrate(1024)
	.videoCodec('libvpx')
	res.writeHead(200, {
		'Cache-Control': 'no-cache, no-store',
		'Content-Length': file.length,
		'Content-Type': 'video/webm'
	})
	return pump(flux, res);
}

export const startStream = (file: any, req: any, res: any) => {
	res.setHeader('Content-Length', file.length);
	res.setHeader('Content-Type', `video/${file.type}`);
	const ranges: any = parseRange(file.length, req.headers.range, { combine: true });
	if (ranges === -1) {
        res.statusCode = 416;
        return res.end();
    } else {
		res.statusCode = 206;
		res.setHeader('Content-Length', 1 + ranges[0].end - ranges[0].start);
		res.setHeader('Content-Range', `bytes ${ranges[0].start}-${ranges[0].end}/${file.length}`);
        let flux = file.createReadStream(ranges[0])
		return pump(flux,res);
	}
}

export const isDownloaded = (magnet: string) => {
	return null; // si false sinon return file object ?
}

export const getTorrentFile = (engine: any) => {
	return new Promise(function (resolve, reject) {
	engine.on('ready', function() {
	  engine.files.forEach(function (file: any) {
		const type = path.extname(file.name).slice(1);
		if (type === 'mkv' || type === 'mp4') {
		  file.type = type;
		  resolve(file);
		}
	  });
	});
  });
}