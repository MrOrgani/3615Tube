// const mongoose = require("mongoose");

exports.startMongoServer = async (): Promise<any> => {
  const mongoDb = process.env.dbHost;
  try {
    mongoose.connect(
      mongoDb,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (): void => {
        console.log("🛷   We are connected to mongo DB on port 27017");
      }
    );
  } catch (err) {
    console.log("error connecting to mongodb", err);
  }
  // mongoose.Promise = global.Promise;

  const db = mongoose.connection;
  db.on("connected", function() {
    // console.log("we are connected on connection");
  });
};
