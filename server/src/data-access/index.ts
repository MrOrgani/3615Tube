const mongoose = require("mongoose");
import { makeTubeDb } from "./tubeDb";
import { User } from "../use-cases";
//in TS we export and import to create modules, else they are global variables (module.exports is not recognized)

const makeDb = async (): Promise<any> => {
  const mongoDbUrl = process.env.dbHost;
  try {
    // console.log("mongoose is connected", mongoose.connection.readyState);
    if (!mongoose.connection.readyState)
      await mongoose.connect(
        mongoDbUrl,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (): void => {
          console.log("🛷   We are connected to mongo DB on port 27017");
        }
      );
    // const db = mongoose.connection;
    // db.on("connected", function() {
    //   // console.log("we are connected on connection");
    // });
    return mongoose;
  } catch (err) {
    console.log("error connecting to mongodb", err);
  }
  // mongoose.Promise = global.Promise;
};

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  login: String,
  password: String,
  id: String,
  picture: String,
  verified: Boolean
});
const userModel = mongoose.model("user", userSchema);

const tubeDb = makeTubeDb({ makeDb, userModel, User }); // data-access functions object
export { makeDb, tubeDb };
