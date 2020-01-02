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
        if (session.user) {
          session.destroy(err => {
            if (err) console.log(err);
          });
          return true;
        }
        return false;

        // res.clearCookie("HT_id");
        // return new Promise(response =>
        //   session.destroy(err => {
        //     if (err) {
        //       console.log("logout error: ", err);
        //       response(false);
        //     }
        //     response(true);
        //   })
        // );
        // if (session) return true;
        // return true;
      }
    )
  }
};
