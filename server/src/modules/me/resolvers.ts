import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { createMiddleware } from "../../utils/createMiddleware";
import middleware from "./middleware";

const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_: any, __: any, { req, session }) => {
      console.log(
        "in the me resolver",
        req.session,
        "and the session id:",
        req.session.id
      );
      const user = User.findOne({ where: { id: session.userId } });
      return user;
    })
  }
};

export { resolvers };
