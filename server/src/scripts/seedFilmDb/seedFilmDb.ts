import axios from "axios";
import {
  ytsFormatFilmResult,
  ytsFormatTorrentsResult,
  pctFormatTorrentsResult,
  pctFormatFilmResult
} from "./formats";
import { getConnection, createConnection } from "typeorm";
import { Film } from "../../entity/Films";

////////////////////////// YTES YTS YTS /////////////////////
const getYtsPage: any = async (i: number) => {
  const res = await axios.get(
    `https://yts.lt/api/v2/list_movies.json?limit=50&page=${i}`
  );
  return res.data.data.movies;
};

const seedYts = async (seedBase: number) => {
  console.log("seeding YTS");
  let functionArray: Array<any> = [];
  for (var i = 0; i < seedBase; i++) {
    functionArray.push(getYtsPage(i));
  }
  const rawPagesResults = (await Promise.all(functionArray)) as any;
  let imdbIdArray: string[] = [];
  rawPagesResults.forEach(
    (page: any) =>
      page &&
      page.forEach((film: any) => {
        if (film.imdb_code && !imdbIdArray.includes(film.imdb_code)) {
          imdbIdArray.push(film.imdb_code);
          const torrents: Array<string> = ytsFormatTorrentsResult(film);
          const cleanFilm = Film.create(
            ytsFormatFilmResult(film, torrents) as Film
          );
          cleanFilm.save();
        }
      })
  );
  return imdbIdArray;
};

//\\\\\\\\\\\\\\\\\\\ POPCORN TIME |||||||||||||||||||||
const getPctPage: any = async () => {
  const res = await axios.get(
    `https://tv-v2.api-fetch.website/movies/1?sort=last%20added&order=1&genre=all&keywords=%22%22`
  );
  return res.data;
};

const seedPct = async (imdbIdArray: string[], seedBase: number) => {
  console.log("seeding POPCORNTIME");
  let functionArray: Array<any> = [];
  for (var i = 0; i < seedBase; i++) {
    functionArray.push(getPctPage(i));
  }
  const rawPagesResults = (await Promise.all(functionArray)) as any;
  rawPagesResults.forEach(
    (page: any) =>
      page &&
      page.forEach(async (film: any) => {
        if (film.imdb_id && !imdbIdArray.includes(film.imdb_id)) {
          const torrents: Array<any> = pctFormatTorrentsResult(film);
          const verif = pctFormatFilmResult(film, torrents) as Film;
          if (verif) {
            imdbIdArray.push(film.imdb_id);
            const cleanFilm = Film.create(verif);
            cleanFilm.save();
          }
        }
      })
  );
};

export const seedFilmDatabase = async () => {
  console.log("launching seed DB");
  try {
    await createConnection();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Film)
      .execute();
    const imdbIdArray: string[] = await seedYts(300);
    console.log("FINISHED SEEDING YTS");
    await seedPct(imdbIdArray, 100);
    console.log("FINISHED SEEDING THE DATABASE");
  } catch (e) {
    console.log("caugh an error fetching and formating the data", e.message);
  }
};
/* Uncomment to launch the script */
// seedFilmDatabase();
