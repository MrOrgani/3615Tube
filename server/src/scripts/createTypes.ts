import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import * as path from "path";

import { genSchema } from "../utils/genSchema";

//create Types is user to autogenerate (ty gql2ts) typescript types for our graphql schemas
//the result is stored in schema.d.ts under the GQL namespace
// and used to give a precise type to resolvers' args

//!!BUG!! for some reason it does not recognize the GQL namespace the work around is to declare resolvers' args
//as any just to launch the script (they should be commented bellow)
try {
  const typescriptTypes = generateNamespace("GQL", genSchema());
  fs.writeFile(
    path.join(__dirname, "../types/schema.d.ts"),
    typescriptTypes,
    err => {
      console.log(err);
    }
  );
} catch (err) {
  console.log("err in the createTypes script - - > ", err);
}
