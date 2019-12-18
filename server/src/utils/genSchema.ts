import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema } from "graphql-tools";
import * as glob from "glob";

//genschema is called to generate schemas and typedefs which are the
//foundation of a graphqlserver
export const genSchema: any = () => {
  try {
    const pathToModules = path.join(__dirname, "../modules");
    const graphqlTypes = glob
      .sync(`${pathToModules}/**/*.graphql`)
      .map(x => fs.readFileSync(x, { encoding: "utf8" }));
    const resolvers = glob
      .sync(`${pathToModules}/**/resolvers.?s`)
      .map(resolver => require(resolver).resolvers);
    // console.log(graphqlTypes);
    return makeExecutableSchema({
      typeDefs: mergeTypes(graphqlTypes),
      resolvers: mergeResolvers(resolvers)
    });
  } catch (err) {
    console.log("error in genSchema.ts", err);
    return err;
  }
};
