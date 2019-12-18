import { createConnection } from "typeorm";

const connectToDb = async () => {
  await createConnection().then(() => {
    console.log(`database connection made on port ${process.env.DB_HOST} `);
  });
};
export default connectToDb;
