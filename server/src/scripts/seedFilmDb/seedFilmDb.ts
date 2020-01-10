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
  for (var i = 0; i < 100; i++) {
    functionArray.push(getYtsPage(i));
  }
  const rawPagesResults = (await Promise.all(functionArray)) as any;
  const rawFilmsResults: Array<any> = [];
  let imdbIdArray: string[] = [];
  rawPagesResults.forEach((page: any) =>
    page.forEach((film: any) => {
      if (!imdbIdArray.includes(film.imdb_code)) {
        imdbIdArray.push(film.imdb_code);
        rawFilmsResults.push(film);
      }
    })
  );
  // console.log("rawFilmsResults size:", rawFilmsResults.length);
  const ytsCleanResult: any = await rawFilmsResults.map((movie: any) => {
    const torrents: Array<any> = ytsFormatTorrentsResult(movie);
    const cleanFilm = ytsFormatFilmResult(movie, torrents);
    return cleanFilm;
  });
  return { ytsCleanResult, imdbIdArray };
};

//\\\\\\\\\\\\\\\\\\\ POPCORN TIME |||||||||||||||||||||
const getPctPage: any = async () => {
  const res = await axios.get(
    `https://tv-v2.api-fetch.website/movies/1?sort=last%20added&order=1&genre=all&keywords=%22%22`
  );
  return res.data;
};

const seedPct = async (imdbIdArray: string[]) => {
  console.log("seeding POPCORNTIME");
  let functionArray: Array<any> = [];
  for (var i = 0; i < 100; i++) {
    functionArray.push(getPctPage(i));
  }
  const rawPagesResults = (await Promise.all(functionArray)) as any;
  const rawFilmsResults: Array<any> = [];
  rawPagesResults.forEach((page: any) =>
    page.forEach(async (film: any) => {
      if (!(await imdbIdArray.includes(film.imdb_id)))
        rawFilmsResults.push(film);
    })
  );
  // console.log("rawFilmsResults size:", rawFilmsResults.length);
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
    // const [ytsCleanResult, pctCleanResult] = (await Promise.all([
    //   seedYts,
    //   seedPct
    // ])) as any[];
    // let ytsCleanResult:any = {};
    // let pctCleanResultan = {};
    // await (() => {
    //   ytsCleanResult = seedYts();
    //   pctCleanResult = seedPct();
    // });

    const { ytsCleanResult, imdbIdArray } = await seedYts();
    // console.log(
    //   " ---- RESULT FROM YTS ---- ",
    //   ytsCleanResult.length
    //   // ytsCleanResult[0]
    // );
    const pctCleanResult = await seedPct(imdbIdArray);
    // console.log(
    //   " ---- RESULT FROM POPCORN TIME ---- ",
    //   pctCleanResult.length
    //   // pctCleanResult[0].title
    // );
    console.log(
      "finished querying information and formating --> now puting it into the db"
    );
    if ((await ytsCleanResult) && (await pctCleanResult)) {
      const finalResult = ytsCleanResult.concat(pctCleanResult);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Film)
        .values(finalResult)
        .execute();
      console.log("FINISHED SEEDING THE DATABASE");
    } else console.log("a problem occured and one of the results was empty");
  } catch (e) {
    console.log("caugh an error fetching and formating the data", e);
  }
};
seedFilmDatabase();
