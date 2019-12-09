import * as nodemailer from "nodemailer";
import SMTPConnection = require("nodemailer/lib/smtp-connection");
import SMTPTransport = require("nodemailer/lib/smtp-transport");
// import sendmail from "sendmail";
export const sendMail = async (
  email: string,
  id: string,
  np: boolean = false
) => {
  console.log(email, id, np);
  const testAccount = await nodemailer.createTestAccount();
  const auth: SMTPConnection.AuthenticationType = {
    user: testAccount.user,
    pass: testAccount.pass
  };
  const transport: SMTPTransport = {
    host: "smtp.ethereal.email",
    port: 587,
    sendmail: true,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  };
  const transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    sendmail: true,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
  const payload: object = {
    from: "ValentinLePigeon@3615Tube.com",
    to: email,
    subject: !np ? "Welcome" : "Password forgotten",
    text: !np ? "Confirm your account" : "Change your password",
    html: !np
      ? `Confirm your account : <a href=\"${process.env.BACK_HOST}/confirm/${id}\">here</a>`
      : `Change your password : <a href=\"${process.env.BACK_HOST}/reset/${id}\">here</a>`
  };
  transporter.sendMail(payload);
};

// const mailSender = sendmail({
//     logger: {
//       debug: console.log,
//       info: console.info,
//       warn: console.warn,
//       error: console.error
//     },
//     silent: false,
//     dkim: { // Default: False
//       privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
//       keySelector: 'mydomainkey'
//     },
//     devPort: 1025, // Default: False
//     devHost: 'localhost', // Default: localhost
//     smtpPort: 2525, // Default: 25
//     smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
//   })
