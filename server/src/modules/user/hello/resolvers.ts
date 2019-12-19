import { ResolverMap } from "../../../types/graphql-utils";

//this query is just a dummy to check that server is working
const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: any) => {
      // console.log(name);
      return `Hello ${name || "World"}`;
    }
  }
};

export { resolvers };
