import { buildCreateUser, User } from "./user";
import uuid from "../uuid";

const createUser = buildCreateUser({ uuid });

export { createUser, User };
