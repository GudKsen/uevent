import qr from 'qrcode';
import path from 'path';
import fs from 'fs';
import nodemailer from "nodemailer";
import { Canva } from './canvas.js';
import { sendTicket } from '../Email/sendEmail.js';

export async function generateQRCode(event, email)
{
    console.log("🚀 ~ file: generateQRCode.js:5 ~ event:", event[0].Event_ID)

    let data = {
        EventID: event[0].Event_ID
    }

    let strJson = JSON.stringify(data);
    let pathImg = path.resolve("public/QRCodes");
    let date = new Date().getTime().toString();
    // let filename = `${pathImg}/qr_${date}.png`;
    let filename = `.\\public\\QRCodes\\qr_${date}.jpg`;

    await qr.toFile(filename, strJson, async (err) => {
        if (err) { return console.log(err); }
        let pathTicket = await Canva(event);
        sendTicket(email, pathTicket, event[0]);
        console.log("SuccessAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    });
    
    // let str = filename.slice(2);
    
    // const imgData = fs.readFileSync("public\\QRCodes\\qr_1681667889667.png", {encoding: 'base64'});

    let str = filename.slice();
    
    return str;
}