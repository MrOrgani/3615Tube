const mongoose = require("mongoose");

const startServer = async (): Promise<any> => {
  const mongoDb = "mongodb://localhost:27017/test";
  await mongoose.connect(mongoDb, { useNewUrlParser: true });
  // mongoose.Promise = global.Promise;

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  // db.once("open", function() {
  //   //connected
  // });
};

startServer();
