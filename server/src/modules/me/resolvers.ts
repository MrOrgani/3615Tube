import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { createMiddleware } from "../../utils/createMiddleware";
import middleware from "./middleware";

const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_: any, __: any, { session }) => {
      console.log("in the me resolver", session);
      const user = User.findOne({ where: { id: session.userId } });
      return user;
    })
  }
};

export { resolvers };
