import nodemailer from "nodemailer";

export function send(email, text, link) {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      //------KSENIIA SETTINGS-------------------------
      user: "4c475d92282587",
      pass: "821b514591f9f1"
      //-----------------------------------------------
      //------STANISLAVA SETTINGS----------------------
      // user: "d13f138085da46",
      // pass: "6b479d6d87fb70"
      //-----------------------------------------------
    }
  });

  var mailOptions = {
    from: '"Example Team" <admin@example.com>',
    to: email,
    subject: "New password",
    html: `<h1>Hello, user</h1>
             <p>${text}</p>
             <a href="${link}">Click here</a>
             <p>Good time for you!</p>`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}



