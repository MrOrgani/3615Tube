import torrentStream from 'torrent-stream'
import fs from 'fs'

// Server-Side Downloading Torrent Function
export function downloadServerTorrent(magnet: string){
	return new Promise((resolve,reject) => {
		const options = {
			path: './downloads/', // Where to save the files. Overrides `tmp`.
			verify: true
		}
		const engine = torrentStream(magnet, options);
		engine.on('ready', async function (){
			if(engine.files.length < 1){
				return;
			}
			const getMovie = engine.files.sort((a, b) => (a.length > b.length ? -1 : 1))
			const movie = getMovie[0]
			let read = movie.createReadStream()
			let total = movie.length
			let progress = 0
			read.on('data', (chunk: any) => {
				progress += chunk.length
				console.log(movie.name + " : " + Math.round(100 * progress / total) + "%")
			})
		})
	})
}

// Testing
const startTest = async () => {
	const joker = 'magnet:?xt=urn:btih:33435E0D8EE7311F5AC93531A402F7A002E4A750&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337'
	const prestige = "magnet:?xt=urn:btih:AAA47382B2E6834CD487D0858BCD502D40145F7E&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
	const batman = "magnet:?xt=urn:btih:A260FBC02AE0B4386677220BCCB18158512F5A0C&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
	console.log('==>DOWNLOAD RUN<==')
	downloadServerTorrent(joker)
	downloadServerTorrent(prestige)
	downloadServerTorrent(batman)
	console.log('==>DOWNLOAD STOP<==')
}
startTest()