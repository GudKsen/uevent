import express from 'express';
import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config();


const { CLIENT_ID, APP_SECRET } = process.env;
const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};

const router = express.Router();

// create a new order
router.post("/create-paypal-order", async (req, res) => {
  const order = await createOrder(req.body);
  res.json(order);
});

// capture payment & store order information or fullfill order
router.post("/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  const captureData = await capturePayment(orderID);
  // TODO: store payment information such as the transaction ID
  res.json(captureData);
});

//////////////////////
// PayPal API helpers
//////////////////////

// use the orders api to create an order
async function createOrder(data) {
  console.log("🚀 ~ file: payment.js:36 ~ createOrder ~ data:", data)
  const accessToken = await generateAccessToken();
  const url = `${baseURL.sandbox}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: data.product.currency,
            value: data.product.cost,
          },
        },
      ],
    }),
  });
  return handleResponse(response);
//   const data = await response.json();
//   return data;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201)
  {
    return response.json();
  }
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

// use the orders api to capture payment for an order
async function capturePayment(orderId) {
  //TODO: write purchase information to database
  console.log("🚀 ~ file: payment.js:73 ~ capturePayment ~ orderId:", orderId)
  const accessToken = await generateAccessToken();
  const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}

// generate an access token using client id and app secret
async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64")
  const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

export default router; 