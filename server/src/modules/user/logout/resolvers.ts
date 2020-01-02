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
        return new Promise(response =>
          session.destroy(err => {
            if (err) {
              console.log("logout error: ", err);
              response(false);
            }
            res.clearCookie("HT_id");
            response(true);
          })
        );
        // if (session) return true;
        // return true;
      }
    )
  }
};
