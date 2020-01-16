import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";

export const resolvers: ResolverMap = {
  Query: {
    dummy: () => "dummy"
  },
  Mutation: {
    logout: createMiddleware(
      verifyAndSetSession,
      async (_: any, __: any, { res, session }) => {
        res.clearCookie("HT_id");
        if (session.user) {
          session.destroy(err => {
            if (err) console.log("error eliminating the session", err);
          });
          return true;
        }
        return false;
      }
    )
  }
};
