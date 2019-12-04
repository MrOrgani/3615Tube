import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeOrmConn = async (connType: string) => {
  // console.log(process.env.NODE_ENV);
  // console.log(process.env);
  const connectionOptions = await getConnectionOptions(connType);
  console.log(connType);
  return createConnection(connectionOptions);
};
