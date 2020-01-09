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

const seedYts = async () => {
  console.log("seeding YTS");
  let functionArray: Array<any> = [];
  for (var i = 0; i < 1; i++) {
    functionArray.push(getYtsPage(i));
  }
  const rawPagesResults = (await Promise.all(functionArray)) as any;
  const rawFilmsResults: Array<any> = [];
  rawPagesResults.forEach((page: any) =>
    page.forEach((film: any) => rawFilmsResults.push(film))
  );
  console.log("rawFilmsResults size:", rawFilmsResults.length);
  const cleanResults: any = await rawFilmsResults.map((movie: any) => {
    const torrents: Array<any> = ytsFormatTorrentsResult(movie);
    return ytsFormatFilmResult(movie, torrents);
  });
  return cleanResults;
};

//\\\\\\\\\\\\\\\\\\\ POPCORN TIME |||||||||||||||||||||
const getPctPage: any = async (i: number) => {
  const res = await axios.get(
    `https://tv-v2.api-fetch.website/movies/1?sort=last%20added&order=1&genre=all&keywords=%22%22`
  );
  return res.data;
};

const seedPct = async () => {
  console.log("seeding POPCORNTIME");
  let functionArray: Array<any> = [];
  for (var i = 0; i < 1; i++) {
    functionArray.push(getPctPage(i));
  }
  const rawPagesResults = (await Promise.all(functionArray)) as any;
  const rawFilmsResults: Array<any> = [];
  rawPagesResults.forEach((page: any) =>
    page.forEach((film: any) => rawFilmsResults.push(film))
  );
  console.log("rawFilmsResults size:", rawFilmsResults.length);
  const cleanResults: any = await rawFilmsResults
    .map((movie: any) => {
      const torrents: Array<any> = pctFormatTorrentsResult(movie);
      return pctFormatFilmResult(movie, torrents);
    })
    .filter(e => e !== null);
  return cleanResults;
};

const seedFilmDatabase = async () => {
  try {
    await createConnection();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Film)
      .execute();
    const ytsCleanResult = await seedYts();
    console.log(
      " ---- RESULT FROM YTS ---- ",
      ytsCleanResult.length
      // ytsCleanResult[0]
    );
    const pctCleanResult = await seedPct();
    console.log(
      " ---- RESULT FROM POPCORN TIME ---- ",
      pctCleanResult.length
      // pctCleanResult[0].title
    );
    const finalResult = ytsCleanResult.concat(pctCleanResult);
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Film)
      .values(finalResult)
      .execute();
  } catch (e) {
    console.log("caugh an error fetching and formating the data", e);
  }
};
seedFilmDatabase();
