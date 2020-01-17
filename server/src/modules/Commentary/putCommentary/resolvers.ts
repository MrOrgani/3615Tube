import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";
import { Commentary } from "../../../entity/Commentary";
import moment from "moment";
import { Film } from "../../../entity/Films";

const resolvers: ResolverMap = {
  Mutation: {
    putCommentary: createMiddleware(
      verifyAndSetSession,
      async (
        _: any,
        { text, imdbId }: GQL.IPutCommentaryOnMutationArguments,
        { session }: any
      ) => {
        //   async (_: any, { text, imdbId }: any, { session }: any) => {
        if (!text || !imdbId || typeof imdbId !== "string" || text.length > 500)
          return null;
        // const userId: any = "2a2cf8cc-769d-459c-94a3-5863a504c9d5" for testing
        const filmExist: any = await Film.findOne(imdbId);
        if (!filmExist) {
          return null;
        }
        const newCommentary = new Commentary();
        newCommentary.film_id = imdbId;
        newCommentary.text = text;
        newCommentary.author = session.user.id;
        await newCommentary.save();
        return {
          id: newCommentary.id,
          film_id: newCommentary.film_id,
          authorId: {
            login: session.user.login,
            avatar: session.user.avatar,
            id: session.user.id
            // login: "micka", for testing
            // avatar: ""
          },
          createdAt: moment(newCommentary.createdAt).fromNow(),
          text: newCommentary.text
        };
      }
    )
  }
};

export { resolvers };
