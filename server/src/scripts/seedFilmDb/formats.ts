import { generateKeyPairSync } from "crypto";

//||||||||||||POPCORN TIME||||||||||||||
export const pctFormatTorrentsResult = (movie: any) => {
  const torrents: Array<string> = [];
  for (const language in movie.torrents) {
    for (const quality in movie.torrents[language]) {
      const torrent = {
        magnet: movie.torrents[language][quality].url,
        quality: quality,
        language: language,
        seed: movie.torrents[language][quality].seed,
        peer: movie.torrents[language][quality].peer,
        bytes: movie.torrents[language][quality].size,
        fileSize: movie.torrents[language][quality].filesize,
        source: "Popcorn Time"
      };
      torrents.push(JSON.stringify(torrent));
    }
  }
  return torrents;
};

export const pctFormatFilmResult = (movie: any, torrents: Array<string>) => {
  if (!movie.images || !movie.images.poster) return null;
  movie.genres.push("all");
  return {
    imdbId: movie.imdb_id,
    title: movie.title.toLowerCase(),
    year: movie.year,
    synopsis: movie.synopsis,
    runtime: parseInt(movie.runtime),
    trailer: movie.trailer,
    genres: movie.genres.map((genre: any) => genre.toLowerCase()),
    poster: movie.images.poster,
    rating: movie.rating.percentage,
    torrents: torrents
  };
};

////////////////////////// YTES YTS YTS /////////////////////
export const ytsFormatTorrentsResult = (movie: any) => {
  const torrents: Array<string> = [];
  for (const item in movie.torrents) {
    const torrent = {
      magnet: movie.torrents[item].url,
      quality: movie.torrents[item].quality,
      language: "en",
      seed: movie.torrents[item].seeds,
      peer: movie.torrents[item].peers,
      bytes: movie.torrents[item].size_bytes,
      fileSize: movie.torrents[item].size,
      source: "YTS"
    };
    torrents.push(JSON.stringify(torrent));
  }
  return torrents;
};

export const ytsFormatFilmResult = (movie: any, torrents: Array<string>) => {
  movie.genres.push("all");
  return {
    imdbId: movie.imdb_code,
    title: movie.title.toLowerCase(),
    year: movie.year,
    synopsis: movie.synopsis,
    runtime: movie.runtime,
    genres: movie.genres.map((genre: any) => genre.toLowerCase()),
    trailer: movie.yt_trailer_code
      ? `http://youtube.com/watch?v=${movie.yt_trailer_code}`
      : null,
    poster: movie.large_cover_image,
    rating: movie.rating * 10,
    torrents: torrents
  };
};
