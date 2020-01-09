import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { pctAdd } from "../../../utils/apiGlobals";
import Axios from "axios";
import {
  pctFormatFilmResult,
  pctFormatTorrentsResult
} from "../../../scripts/seedFilmDb/formats";
import { Film } from "../../../entity/Films";

const resolvers: ResolverMap = {
  Query: {
    findOneFilm:
      // findOneMoive: createMiddleware(
      //   verifyAndSetSession,
      async (_: any, { imdbId }: any) => {
        const url = `${pctAdd}/movie/${imdbId}`;
        // console.log("in the findOneFilm Resolver", url);
        try {
          const result = (await Film.findOne({
            where: { imdbId: imdbId }
          })) as any;
          // const pctFilm = await Axios.get(url);
          // // console.log(pctFilm);
          // if (!pctFilm.data) return null;
          // const torrents = await pctFormatTorrentsResult(pctFilm.data);
          // const result = await pctFormatFilmResult(pctFilm.data, torrents);
          // // console.log(result);
          return result;
        } catch (err) {
          console.log("error in the film fetching", err);
          return null;
        }
      }
  }
};

export { resolvers };
