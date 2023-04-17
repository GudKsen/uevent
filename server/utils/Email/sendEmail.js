import nodemailer from "nodemailer";
import fs from 'fs';

export function send(email, text, link) {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      //------KSENIIA SETTINGS-------------------------
      user: "4c475d92282587",
      pass: "821b514591f9f1",
      //-----------------------------------------------
      //------STANISLAVA SETTINGS----------------------
      // user: "d13f138085da46",
      // pass: "6b479d6d87fb70"
      //-----------------------------------------------
    },
  });
  var mailOptions;

  if (!link) {
    mailOptions = {
      from: '"Example Team" <admin@example.com>',
      to: email,
      subject: "New password",
      html: `<h1>Hello, user</h1>
               <p>${text}</p>
               <p>Good time for you!</p>`,
    };
  } else {
    mailOptions = {
      from: '"Example Team" <admin@example.com>',
      to: email,
      subject: "New password",
      html: `<h1>Hello, user</h1>
               <p>${text}</p>
               <a href="${link}">Click here</a>
               <p>Good time for you!</p>`,
    };
  }

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

export async function sendTicket(email, text, data) {
  console.log("🚀 ~ file: sendEmail.js:60 ~ sendTicket ~ text:", text)
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    // host: "smtp.gmail.com",
    port: 2525,
    // port: 465,
    // secure: true,
    auth: {
      //------KSENIIA SETTINGS-------------------------
      user: "4c475d92282587",
      pass: "821b514591f9f1"
      //-----------------------------------------------
      //------STANISLAVA SETTINGS----------------------
      // user: "d13f138085da46",
      // pass: "6b479d6d87fb70"
      //-----------------------------------------------
    },
  });

  text.replace("/", "\\");
  const imgData = fs.readFileSync(text.slice(2), {encoding: 'base64'});

  var mailOptions = {
    // from: '"Example Team" <admin@example.com>',
    from: "tt3055783@gmail.com",
    to: email,
    subject: "New password",
    html: `
    <h1>${data.title}</h1>
    <p>${data.description}</p>
    <br />
    <img src="data:image/png;base64,${imgData}"/>
    `,
    // attachments: [
    //   {
    //     filename: "ticket.png",
    //     path: "public\\QRCodes\\qr_1681713314489.png"
    //   }
    // ]
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}

export function sendNotification(email, text) {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      //------KSENIIA SETTINGS-------------------------
      user: "4c475d92282587",
      pass: "821b514591f9f1",
      //-----------------------------------------------
      //------STANISLAVA SETTINGS----------------------
      // user: "d13f138085da46",
      // pass: "6b479d6d87fb70"
      //-----------------------------------------------
    },
  });

  var mailOptions = {
    from: '"Example Team" <admin@example.com>',
    to: email,
    subject: "New user on event",
    html: `<h1>Hello, user</h1>
             <p>${text}</p>
             <p>See all users on this event:</p>
             <a href="http://localhost:3000/events-manage">Click here</a>
             <p>Good time for you!</p>`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}
