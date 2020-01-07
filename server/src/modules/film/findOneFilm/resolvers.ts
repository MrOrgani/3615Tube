import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { pctAdd } from "../../../utils/apiGlobals";
import Axios from "axios";
import { formatFilmResult } from "../../subModules/formatFilmResult";

const resolvers: ResolverMap = {
  Query: {
    findOneFilm:
      // findOneMoive: createMiddleware(
      //   verifyAndSetSession,
      async (_: any, { imdbId }: any) => {
        const url = `${pctAdd}/movie/${imdbId}`;
        // console.log("in the findOneFilm Resolver", url);
        try {
          const pctFilm = await Axios.get(url);
          // console.log(pctFilm);
          if (!pctFilm.data) return null;
          const result = await formatFilmResult(pctFilm.data);
          // console.log(result);
          return result;
        } catch (err) {
          console.log("error in the film fetching", err);
          return null;
        }
      }
  }
};

export { resolvers };
