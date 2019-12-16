import { getConnection } from "typeorm";
import { User } from "../entity/User";

export const rmTestUser = async (login: string) => {
  //   console.log("deleting a user", login);
  getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("login = :login", { login })
    .execute();
};
