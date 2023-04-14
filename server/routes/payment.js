import express from 'express';
import { capturePayment, createOrder } from '../utils/Payment/paypalHelpers.js';

import dotenv from "dotenv";
import { BuyTicket } from '../controllers/Ticket/Ticket.js';

import auth from "../middlewares/verifyToken.js";

dotenv.config();

const router = express.Router();

// create a new order
router.post("/create-paypal-order", async (req, res) => {
  const order = await createOrder(req.body);
  res.json(order);
});

// capture payment & store order information or fullfill order
// router.post("/capture-paypal-order", async (req, res) => {
//   const { orderID, productId } = req.body;
//   const captureData = await capturePayment(orderID);

//   // TODO: store payment information such as the transaction ID
//   res.json(captureData);
// });

router.post("/capture-paypal-order", auth ,BuyTicket);



export default router; 