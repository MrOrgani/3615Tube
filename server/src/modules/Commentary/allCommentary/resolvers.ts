import { ResolverMap } from "../../../types/graphql-utils";
import { getRepository } from "typeorm";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { Commentary } from "../../../entity/Commentary";
import { formatCommentaryResult } from "../subModules/formatCommentaryResult";

const resolvers: ResolverMap = {
  Query: {
    allCommentary: createMiddleware(
      verifyAndSetSession,
      async (_: any, { imdbId }: { imdbId: string }) => {
        const result = await getRepository(Commentary)
          .createQueryBuilder("commentary")
          .innerJoinAndSelect("commentary.author", "user.id")
          .where("commentary.film_id = :imdbId", { imdbId })
          .orderBy("commentary.createdAt", "DESC")
          .execute();
        if (!result[0]) return null;
        return formatCommentaryResult(result);
      }
    )
  }
};

export { resolvers };
