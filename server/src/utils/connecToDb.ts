import { createConnection } from "typeorm";

const connectToDb = async () => {
  //createconnection uses the set up from typeorm
  await createConnection().then(() => {
    console.log(`database connection made on port ${process.env.DB_HOST} `);
  });
};
export default connectToDb;
