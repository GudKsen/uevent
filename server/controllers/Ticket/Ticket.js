import puppeteer from "puppeteer";
import fs from 'fs';

import { Ticket } from "../../entities/Ticket/Ticket.js";
import { generateQRCode } from "../../utils/QRCode/generateQRCode.js";
import { DatabaseFind } from "../../database/DB_Functions/DatabaseFind.js";
import { capturePayment } from "../../utils/Payment/paypalHelpers.js";
import { sendNotification, sendTicket } from "../../utils/Email/sendEmail.js";
import { Event } from "../../entities/Event/Event.js"
import { Location } from "../../entities/Location/Location.js";
import { Canva } from "../../utils/QRCode/canvas.js";

export const BuyTicket = async (req, res) => {
  const { orderID, productId } = req.body;
  const captureData = await capturePayment(orderID);

  let event_id = productId.productId;
  let user_id = req.user._id;
  let purchase_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  let db = new DatabaseFind();
  let event = await db.find_by_id("Event", event_id);
  
  let ev = new Event();
  ev.init(event_id);
  let location = new Location();
  location.init(event[0].Location_ID);
  let data_location = await location.read();

  if (event) {
    let qr_code = generateQRCode(event, req.user.email);

    let ticket = new Ticket(event_id, purchase_date, qr_code, user_id);
    ticket.create();

    let text = `${req.user.full_name} has just join to your event.`;
    let company = await db.find_by_id("Company", event[0].Company_ID);

    // let g = qr_code.slice(2);
    // const imgData2 = fs.readFileSync(g, {encoding: 'base64'});
    
    sendNotification(company[0].email, text);
    sendTicket(req.user.email, qr_code, event[0]);

    return res.json(captureData);
  }
  return res.status(404).json("No such event");
};

export const GetFreeTicket = async (req, res) =>
{
  let event_id = parseInt(req.params.id);
  let user_id = req.user._id;
  let purchase_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  let db = new DatabaseFind();
  let event = await db.find_by_id("Event", event_id);
  console.log("🚀 ~ file: Ticket.js:56 ~ event:", event)
  
  let ev = new Event();
  ev.init(event_id);
  let location = new Location();
  location.init(event[0].Location_ID);
  let data_location = await location.read();

  if (event) {
    

    let ticket = new Ticket(event_id, purchase_date, "", user_id);
    ticket.create();

    let text = `${req.user.full_name} has just join to your event.`;
    let company = await db.find_by_id("Company", event[0].Company_ID);
    event[0].company = company;
    event[0].location = data_location;
    let qr_code = await generateQRCode(event, req.user.email);
    event[0].qr_code = qr_code;
    let pathTicket = "";

    
      // pathTicket =  Canva(event);
   
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
    sendNotification(company[0].email, text);
    // 

    return res.json("Ticket was send to your account");
  }
  return res.status(404).json("No such event");
}

export const GetTicket = async (req, res) => {
  let id = parseInt(req.params.id);
  let ticket = new Ticket();
  ticket.init(id);
  let data = await ticket.read();
  res.json(data);
};

export const GetTickets = async (req, res) => {
  let ticket = new Ticket((user_id = req.user._id));
  let data = await ticket.readAll();
  res.json(data);
};

export const DeleteTicket = (req, res) => {
  let id = parseInt(req.params.id);
};
