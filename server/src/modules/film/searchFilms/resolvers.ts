import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { Film } from "../../../entity/Films";
import { Between, Like, Raw } from "typeorm";
// import { fetchRawData } from "../../../scripts/seedFilmDb/fetchRawData";
// import { ytsFetch } from "../subModules/ytsFetch";
// import { formatSearch } from "../../../scripts/seedFilmDb/formats";

// pct:https://tv-v2.api-fetch.website/movies/1?sort=last%20added&amp;order=-1&amp;genre=action&amp;keywords=%22%22
const defaultValues: {
  rating: number[];
  year: number[];
  genres: string;
  keywords: string;
} = {
  rating: [0, 100],
  year: [0, 2021],
  genres: "comedy",
  keywords: "nation"
};

// A est contenu par B --> A <@ B

const resolvers: ResolverMap = {
  Query: {
    searchFilms:
      // searchFilms: createMiddleware(
      //   verifyAndSetSession,
      async (_: any, args: any) => {
        try {
          if (!args.prodYear) args.year = defaultValues.year;
          if (!args.rating) args.rating = defaultValues.rating;
          console.log(!args.keywords, defaultValues.keywords);
          args.keywords = !args.keywords
            ? defaultValues.keywords
            : args.keywords.tolowerCase();

          console.log(args.keywords, args.genres[0]);
          const result = (await Film.find({
            rating: Between(args.rating[0], args.rating[1]),
            year: Between(args.year[0], args.year[1]),
            title: Like(`%${args.keywords}%`),
            genres: Raw(alias => `${alias} @> "${args.genres[0]}"`) //SQL INJECTIONS
          })) as any;
          return result;

          //   //FETCH DATA
          //   const [pctRawResult, ytsRawResult] = await Promise.all([
          //     fetchRawData(args, "pct"),
          //     fetchRawData(args, "yts")
          //   ]);
          //   // console.log(
          //   //   " ---- RESULT FROM POPCORN ---- ",
          //   //   pctRawResult.length,
          //   //   pctRawResult[0]
          //   // );
          //   // console.log(
          //   //   " ---- RESULT FROM YTS ---- ",
          //   //   ytsRawResult.length,
          //   //   ytsRawResult[0]
          //   // );
          //   //FORMATER PCT
          //   const pctCleanList = await formatSearch(
          //     pctRawResult,
          //     "pct",
          //     pctRawResult
          //   );
          //   // console.log(
          //   //   " ---- CLEAN FILM LIST FROM POPCORN ---- ",
          //   //   pctCleanList.length
          //   //   // pctCleanList[0]
          //   // );
          //   //FORMATER YTS ET VERIFIER DOUBLON
          //   const ytsCleanList = await formatSearch(
          //     ytsRawResult,
          //     "yts",
          //     pctRawResult
          //   );
          //   console.log(
          //     " ---- CLEAN FILM LIST FROM BOTH YTS--  PCT-- ",
          //     ytsCleanList.length,
          //     pctCleanList.length
          //     // ytsCleanList[0]
          //   );
          //   const finalList = pctCleanList.concat(ytsCleanList);
          //   console.log("final List from BOTH", finalList.length);
          //   return finalList;
        } catch (err) {
          console.log("error in the film fetching", err);
          return null;
        }
        // console.log("in the findOneFilm Resolver", url);
      }
  }
};

export { resolvers };
