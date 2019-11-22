const mongoose = require("mongoose");

exports.startMongoServer = async (): Promise<any> => {
  const mongoDb = "mongodb://localhost:27017/test";
  console.log(
    mongoose.connect(mongoDb, { useNewUrlParser: true }, (): void => {
      console.log("we are connected");
    })
  );
  console.log("coucou");
  // mongoose.Promise = global.Promise;

  const db = mongoose.connection;
  db.on("connected", function() {
    console.log("we are connected on connection");
  });
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("running");
    //connected
  });
};

// export default startMongoServer;
