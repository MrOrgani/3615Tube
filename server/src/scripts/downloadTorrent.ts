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
				reject();
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
			engine.on('idle', () => {
				console.log('===>FINISH FILE : ', movie.name)
				resolve()
			})
		})
	})
}

// Testing
const startTest = async () => {
	// const joker = 'magnet:?xt=urn:btih:33435E0D8EE7311F5AC93531A402F7A002E4A750&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337'
	const strangerThings = "magnet:?xt=urn:btih:A2139C74CEDEBACA76681A6DCAA441EE4891561C&dn=stranger+things+s01e01+webrip+x264+turbo+ettv&tr=udp%3A%2F%2Ftracker.publicbt.com%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce"
	// const batman = "magnet:?xt=urn:btih:A260FBC02AE0B4386677220BCCB18158512F5A0C&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337"
	console.log('==>DOWNLOAD RUN<==')
	downloadServerTorrent(strangerThings)
	// downloadServerTorrent(batman)
	// downloadServerTorrent(joker)
	console.log('==>DOWNLOAD STOP<==')
}
startTest()