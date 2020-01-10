import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { Commentary } from "../../../entity/Commentary";
import { getConnection } from "typeorm";
import { ResolverMap } from "../../../types/graphql-utils";
import moment from "moment";

const resolvers: ResolverMap = {
  Mutation: {
    removeCommentary: createMiddleware(
      verifyAndSetSession,
      async (
        _: any,
        { id, imdbId }: GQL.IRemoveCommentaryOnMutationArguments,
        { session }: any
      ) => {
        //   async (_: any, { id, imdbId }: any, { session }: any) => {
        const DeleteCommentary = await Commentary.findOne({
          where: { author: session.user.id, id: id, film_id: imdbId }
        });
        if (!DeleteCommentary) return null;
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Commentary)
          .where("id = :id", { id: id })
          .execute();
        return {
          id: DeleteCommentary.id,
          film_id: DeleteCommentary.film_id,
          authorId: {
            login: session.user.login,
            avatar: session.user.avatar
            // login: "micka", to test
            // avatar: ""
          },
          createdAt: moment(DeleteCommentary.createdAt).fromNow(),
          text: DeleteCommentary.text
        };
      }
    )
  }
};

export { resolvers };
