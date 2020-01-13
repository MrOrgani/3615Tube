import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { Film } from "../../../entity/Films";

const resolvers: ResolverMap = {
  Query: {
    findOneFilm: createMiddleware(
      verifyAndSetSession,
      async (_: any, { imdbId }: { imdbId: string }) => {
        try {
          const result = (await Film.findOne({
            where: { imdbId: imdbId }
          })) as any;
          console.log(result);
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
