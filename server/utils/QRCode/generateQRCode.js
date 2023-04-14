import qr from 'qrcode';
import path from 'path';

export function generateQRCode(event)
{
    console.log("🚀 ~ file: generateQRCode.js:5 ~ event:", event[0].Event_ID)

    let data = {
        EventID: event[0].Event_ID
    }

    let strJson = JSON.stringify(data);
    let pathImg = path.resolve("public/QRCodes");
    let date = new Date().getTime();
    // let filename = `${pathImg}/qr_${date}.png`;
    let filename = `./public/QRCodes/qr_${date}.png`;

    qr.toFile(filename, strJson, (err) => {
        if (err) { return console.log(err); }
    });

    return filename;
}