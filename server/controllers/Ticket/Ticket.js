import { Ticket } from "../../entities/Ticket/Ticket.js";
import { generateQRCode } from "../../utils/QRCode/generateQRCode.js";
import { DatabaseFind } from "../../database/DB_Functions/DatabaseFind.js";
import { capturePayment } from "../../utils/Payment/paypalHelpers.js";
import { sendNotification, sendTicket } from "../../utils/Email/sendEmail.js";

export const BuyTicket = async (req, res) => {
  const { orderID, productId } = req.body;
  const captureData = await capturePayment(orderID);

  let event_id = productId.productId;
  let user_id = req.user._id;
  let purchase_date = new Date().toISOString().slice(0, 19).replace("T", " ");

  let db = new DatabaseFind();
  let event = await db.find_by_id("Event", event_id);
//   console.log("🚀 ~ file: Ticket.js:16 ~ BuyTicket ~ event:", event)

  if (event) {
    let qr_code = generateQRCode(event);

    let ticket = new Ticket(event_id, purchase_date, qr_code, user_id);
    ticket.create();

    let text = `${req.user.full_name} has just join to your event.`;
    let company = await db.find_by_id("Company", event[0].Company_ID);
    console.log("🚀 ~ file: Ticket.js:27 ~ BuyTicket ~ company:", company)

    sendNotification(company[0].email, text);
    sendTicket(req.user.email, "hi", event[0]);

    return res.json(captureData);
  }
  return res.status(404).json("No such event");
};

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

export const DeleteTickets = (req, res) => {
  let id = parseInt(req.params.id);
};
