import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { Film } from "../../../entity/Films";

const resolvers: ResolverMap = {
  Query: {
    findOneFilm: createMiddleware(
      verifyAndSetSession,
      async (_: any, { imdbId }: { imdbId: string }, { session }) => {
        try {
          const result = (await Film.findOne({
            where: { imdbId: imdbId }
          })) as Film;
          result.seen = session.user.seenFilms.includes(imdbId) ? true : false;
          return result;
        } catch (err) {
          console.log("error in the film fetching", err);
          return null;
        }
      }
    )
  }
};

export { resolvers };
