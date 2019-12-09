import { User } from "../../entity/User";

export const confirmEmail = async (req: any, res: any) => {
  const { id } = req.params;
  const confirmLink = `${process.env.BACK_HOST}/confirm/${id}`;
  const user = await User.find({ confirmLink: confirmLink });
  console.log(user);
  if (!user[0]) {
    res.status(201).send("no user at this address");
  } else {
    User.update({ id: user[0].id }, { verified: true });
    res.status(200).send("user found and status is verified");
  }
};
