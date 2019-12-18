import { ResolverMap } from "../../../types/graphql-utils";
import { createMiddleware } from "../../../utils/createMiddleware";
import middleware from "./middleware";

const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_: any, __: any, { session }) => {
      return session.user;
    })
  }
};

export { resolvers };
