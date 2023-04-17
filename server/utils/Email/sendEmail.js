import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';

export function send(email, text, link) {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      //------KSENIIA SETTINGS-------------------------
      // user: "4c475d92282587",
      // pass: "821b514591f9f1",
      //-----------------------------------------------
      //------STANISLAVA SETTINGS----------------------
      user: "d13f138085da46",
      pass: "6b479d6d87fb70"
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
  console.log("🚀 ~ file: sendEmail.js:61 ~ sendTicket ~ text:", text)
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

  // let url = String(text.slice(2));

  // let gg = "public\\QRCodes\\qr_1681722417964.png";
  // console.log("🚀 ~ file: sendEmail.js:83 ~ sendTicket ~ gg:", gg)
  // console.log(url)
  
  // const imgData = fs.readFileSync(`${text.slice(2)}`, {encoding: 'base64'});
  
  
  // let bitmap = fs.readFileSync(gg);
  // let img = Buffer.from(bitmap, 'utf-8').toString('base64');
 
  // let img2 = Buffer.from(gg, 'utf-8').toString('base64');
 
 let str = text.slice();
  var mailOptions = {
    // from: '"Example Team" <admin@example.com>',
    from: "tt3055783@gmail.com",
    to: email,
    subject: "New password",
    html: `
    <h1>${data.title}</h1>
    <p>${data.description}</p>
    
    `,
    attachments: [
      {
        filename: "ticket.png",
        path: str
      }
    ]
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
      // user: "4c475d92282587",
      // pass: "821b514591f9f1",
      //-----------------------------------------------
      //------STANISLAVA SETTINGS----------------------
      user: "d13f138085da46",
      pass: "6b479d6d87fb70"
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
