import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import verifyAndSetSession from "../../middleware/verifyAndSetSession";

const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(
      verifyAndSetSession,
      (_: any, __: any, { session }) => {
        // console.log("inthe resolver for me", session);
        return session.user;
      }
    )
  }
};

export { resolvers };
