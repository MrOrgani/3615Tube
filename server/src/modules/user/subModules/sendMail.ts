import jwt from "jsonwebtoken";
const mailjet = require("node-mailjet").connect(
  "b350f9da968626f1248aa222aa6855c8",
  "59df192b7d158ab15e56e5cf630171e7"
);

export const sendMail = async (
  firstName: string,
  email: string,
  id: string,
  register: boolean = true
) => {
  const token = jwt.sign({ id }, process.env.SESSION_SECRET);
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "vlecoq-v@student.42.fr",
          Name: "Valentin"
        },
        To: [
          {
            Email: email,
            Name: firstName
          }
        ],
        Subject: register ? "Welcome" : "Password forgotten",
        TextPart: register ? "Confirm your account" : "Change your password",
        HTMLPart: register
          ? `Confirm your account : <a href=\"${process.env.FRONT_HOST}/confirm/${token}\">here</a>`
          : `Change your password : <a href=\"${process.env.FRONT_HOST}/reset/${token}\">here</a>`
      }
    ]
  });
  request.catch((err: any) => {
    console.log(err.statusCode);
  });
};
