import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { fetchRawData } from "../subModules/fetchRawData";
// import { ytsFetch } from "../subModules/ytsFetch";
import { formatSearch } from "../subModules/pctformat";

// pct:https://tv-v2.api-fetch.website/movies/1?sort=last%20added&amp;order=-1&amp;genre=action&amp;keywords=%22%22

const resolvers: ResolverMap = {
  Query: {
    searchFilms:
      // searchFilms: createMiddleware(
      //   verifyAndSetSession,
      async (_: any, args: any) => {
        try {
          //FETCH DATA
          const [pctRawResult, ytsRawResult] = await Promise.all([
            fetchRawData(args, "pct"),
            fetchRawData(args, "yts")
          ]);
          // console.log(
          //   " ---- RESULT FROM POPCORN ---- ",
          //   pctRawResult.length,
          //   pctRawResult[0]
          // );
          // console.log(
          //   " ---- RESULT FROM YTS ---- ",
          //   ytsRawResult.length,
          //   ytsRawResult[0]
          // );
          //FORMATER PCT
          const pctCleanList = await formatSearch(
            pctRawResult,
            "pct",
            pctRawResult
          );
          // console.log(
          //   " ---- CLEAN FILM LIST FROM POPCORN ---- ",
          //   pctCleanList.length
          //   // pctCleanList[0]
          // );
          //FORMATER YTS ET VERIFIER DOUBLON
          const ytsCleanList = await formatSearch(
            ytsRawResult,
            "yts",
            pctRawResult
          );
          console.log(
            " ---- CLEAN FILM LIST FROM YYYYYTTTTTSSSS ---- ",
            ytsCleanList.length
            // ytsCleanList[0]
          );
          const finalList = pctCleanList.concat(ytsCleanList);
          console.log(finalList.length);
          return finalList;
        } catch (err) {
          console.log("error in the film fetching", err);
          return null;
        }
        // console.log("in the findOneFilm Resolver", url);
      }
  }
};

export { resolvers };
