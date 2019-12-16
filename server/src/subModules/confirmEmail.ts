import * as nodemailer from "nodemailer";
// import SMTPConnection = require("nodemailer/lib/smtp-connection");
// import SMTPTransport = require("nodemailer/lib/smtp-transport");
// import Mail = require("nodemailer/lib/mailer");
// import SMTPConnection = require("nodemailer/lib/smtp-connection");
// import SMTPTransport = require("nodemailer/lib/smtp-transport");
// import sendmail from "sendmail";

export const sendMail = async (
  email: string,
  id: string,
  np: boolean = false
) => {
  //   console.log(email, id, np);
  //   const testAccount = await nodemailer.createTestAccount();
  console.log("rdy to crte transport");
  //   let testAccount = await nodemailer.createTestAccount();
  let transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "hester.murray@ethereal.email",
      pass: "S6PVnQW3zn8bXDUkEu"
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
  console.log("ready to send the email to", email);
  await transport.sendMail(payload);
  console.log("email sent");
  //   function nodemailer_test() {
  //     // Generate test SMTP service account from ethereal.email
  //     // Only needed if you don't have a real mail account for testing
  //     nodemailer.createTestAccount(err => {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }
  //       // create reusable transporter object using the default SMTP transport
  //       const transporter = nodemailer.createTransport({
  //         host: "smtp.ethereal.email",
  //         port: 587,
  //         secure: false, // true for 465, false for other ports
  //         // sendmail: true,
  //         auth: {
  //           user: "hester.murray@ethereal.email", // generated ethereal user
  //           pass: "S6PVnQW3zn8bXDUkEu" // generated ethereal password
  //         }
  //       });

  //       // setup email data with unicode symbols
  //       const mailOptions: Mail.Options = {
  //         from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
  //         to: email, // list of receivers
  //         subject: "Hello ✔", // Subject line
  //         text: np ? `Hello world? ${id}` : "caca", // plain text body
  //         html: "<b>Hello world?</b>" // html body
  //       };

  //       // send mail with defined transport object
  //       transporter.sendMail(
  //         mailOptions,
  //         (err, info: SMTPTransport.SentMessageInfo) => {
  //           if (err) {
  //             console.log(err);
  //             return;
  //           }
  //           console.log("Message sent: %s", info.messageId);
  //           // Preview only available when sending through an Ethereal account
  //           console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  //           // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
  //           // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  //         }
  //       );
  //     });
  //   }
  //   nodemailer_test();
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
