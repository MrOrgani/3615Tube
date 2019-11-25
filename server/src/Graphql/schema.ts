import "graphql-import-node";
import * as typeDefs from "./typeDefs.graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../controllers-resolvers";
import { GraphQLSchema } from "graphql";
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
