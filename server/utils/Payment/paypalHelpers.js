import fetch from "node-fetch";

//////////////////////
// PayPal API helpers
//////////////////////

const { CLIENT_ID, APP_SECRET } = process.env;
const baseURL = {
    sandbox: "https://api-m.sandbox.paypal.com",
    production: "https://api-m.paypal.com"
};


// use the orders api to create an order
export async function createOrder(data) {
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
  export async function capturePayment(orderId) {
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