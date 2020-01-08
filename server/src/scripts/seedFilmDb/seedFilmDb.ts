import { pctAdd, ytsAdd } from "../../utils/apiGlobals";
import axios from "axios";
import {
  ytsFormatFilmResult,
  ytsFormatTorrentsResult,
  pctFormatTorrentsResult,
  pctFormatFilmResult
} from "./formats";

////////////////////////// YTES YTS YTS /////////////////////
const getYtsPage: any = async (i: number) => {
  console.log(`https://yts.lt/api/v2/list_movies.json?limit=50&page=${i}`);
  const res = await axios.get(
    `https://yts.lt/api/v2/list_movies.json?limit=50&page=${i}`
  );

  return res.data.data.movies;
};

const seedYts = async () => {
  console.log("seedingYts");
  let functionArray: Array<any> = [];
  for (var i = 0; i < 1; i++) {
    functionArray.push(getYtsPage(i));
  }
  // functionArray = functionArray.map(i => getYtsPage(i));
  const rawPagesResults = (await Promise.all(functionArray)) as any;
  const rawFilmsResults: Array<any> = [];
  rawPagesResults.forEach((page: any) =>
    page.forEach((film: any) => rawFilmsResults.push(film))
  );
  console.log("rawFilmsResults size:", rawFilmsResults.length);
  const cleanResults: any = await rawFilmsResults.map(async (movie: any) => {
    const torrents: Array<any> = await ytsFormatTorrentsResult(movie);
    return await ytsFormatFilmResult(movie, torrents);
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
  // functionArray = functionArray.map(i => getPctPage(i));
  const rawPagesResults = (await Promise.all(functionArray)) as any;
  const rawFilmsResults: Array<any> = [];
  rawPagesResults.forEach((page: any) =>
    page.forEach((film: any) => rawFilmsResults.push(film))
  );
  const cleanResults: any = await rawFilmsResults.map(async (movie: any) => {
    const torrents: Array<any> = await pctFormatTorrentsResult(movie);
    return await pctFormatFilmResult(movie, torrents);
  });
  return cleanResults;
};

const seedFilmDatabase = async () => {
  const ytsCleanResult = await seedYts();
  console.log(
    " ---- RESULT FROM YTS ---- ",
    ytsCleanResult.length,
    typeof ytsCleanResult[0],
    ytsCleanResult[0]
  );
  const pctCleanResult = await seedPct();
  console.log(
    " ---- RESULT FROM YTS ---- ",
    pctCleanResult.length,
    typeof pctCleanResult[0],
    pctCleanResult[0]
  );
};
seedFilmDatabase();
