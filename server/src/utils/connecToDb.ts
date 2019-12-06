import { createConnection } from "typeorm";

const connectToDb = async (retries: number) => {
  while (retries) {
    try {
      await createConnection().then(() => {
        console.log(`database connection made on port ${process.env.DB_HOST} `);
      });
      break;
    } catch (err) {
      retries -= 1;
      if (retries > 0)
        console.log("error connecting to the database, retrying ....");
      else console.log("ERROR CONNECTING TO DB", err);
      await new Promise(res => setTimeout(res, 4000));
    }
  }
};
export default connectToDb;
