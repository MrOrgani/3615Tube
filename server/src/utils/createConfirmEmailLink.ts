import { v4 } from "uuid";

export const createConfirmEmaiLink = () => {
  const uuid = v4();
  return `${process.env.BACK_HOST}/confirm/${uuid}`;
};
