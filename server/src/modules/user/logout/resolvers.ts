import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    dummy: () => "dummy"
  },
  Mutation: {
    logout: (_: any, __: any, { session }) => {
      return new Promise(res =>
        session.destroy(err => {
          if (err) {
            console.log("logout error: ", err);
            res(false);
          }
          res(true);
        })
      );
    }
  }
};
