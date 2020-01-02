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
      async (_: any, __: any, { session }) => {
        return new Promise(res =>
          session.destroy(err => {
            if (err) {
              console.log("logout error: ", err);
              res(false);
            }
            res(true);
          })
        );
        // if (session) return true;
        // return true;
      }
    )
  }
};
