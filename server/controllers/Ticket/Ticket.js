import puppeteer from "puppeteer";

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

  if (event) {
    let qr_code = generateQRCode(event);

    let ticket = new Ticket(event_id, purchase_date, qr_code, user_id);
    ticket.create();

    let text = `${req.user.full_name} has just join to your event.`;
    let company = await db.find_by_id("Company", event[0].Company_ID);
    
    let htmlStr = `
  <html>
  <head>
  <link href="https://fonts.googleapis.com/css?family=Cabin|Indie+Flower|Inknut+Antiqua|Lora|Ravi+Prakash" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"  />
  <style>
  * {
  box-sizing: border-box;
  margin:0;
  padding:0;
}
body {
  background:#DDD;
  font-family: 'Inknut Antiqua', serif;
  font-family: 'Ravi Prakash', cursive;
  font-family: 'Lora', serif;
  font-family: 'Indie Flower', cursive;
  font-family: 'Cabin', sans-serif;
}
  div.container {
    max-width: 3400px;
    margin: 0 auto;
    overflow: hidden
  }
  .container .item {
    width: 41%;
    float: left;
    padding: 0 20px;
    background: #fff;
    overflow: hidden;
    margin: 10px;
  }
  .container .item-right, .container .item-left {
    float: left;
    padding: 20px;
    margin-left: 12px;
  }
  .container .item-right {
    padding: 79px 50px;
    
    width: 25%;
    position: relative;
    height: 286px
  }
  .container .item-right .up-border, .container .item-right .down-border {
      padding: 14px 15px;
      background-color: #ddd;
      border-radius: 50%;
      position: absolute
  }
  .container .item-right .up-border {
    top: -8px;
    right: -35px;
  }
  .container .item-right .down-border {
    bottom: -13px;
    right: -35px;
  }
  .container .item-right .num {
    font-size: 60px;
    text-align: center;
    color: #111
  }
  .container .item-right .day, .container .item-left .event {
    color: #555;
    font-size: 20px;
    margin-bottom: 9px;
  }
  .container .item-right .day {
    text-align: center;
    font-size: 25px;
  }
  .container .item-left {
    width: 71%;
    padding: 34px 0px 19px 46px;
    border-left: 3px dotted #999;
  } 
  .container .item-left .title {
    color: #111;
    font-size: 34px;
    margin-bottom: 12px
  }
  .container .item-left .sce {
    margin-top: 5px;
    display: block
  }
  .container .item-left .sce .icon, .container .item-left .sce p,
  .container .item-left .loc .icon, .container .item-left .loc p{
      float: left;
      word-spacing: 5px;
      letter-spacing: 1px;
      color: #888;
      margin-bottom: 10px;
  }
  .container .item-left .sce .icon, .container .item-left .loc .icon {
    margin-right: 10px;
    font-size: 20px;
    color: #666
  }
  .container .item-left .loc {display: block}
  .fix {clear: both}
  .container .item .tickets, .booked, .cancel{
      color: #fff;
      padding: 6px 14px;
      float: right;
      margin-top: 10px;
      font-size: 18px;
      border: none;
      cursor: pointer
  }
  .container .item .tickets {background: #777}
  .container .item .booked {background: #3D71E9}
  .container .item .cancel {background: #DF5454}
  .linethrough {text-decoration: line-through}
  @media only screen and (max-width: 1150px) {
    .container .item {
      width: 100%;
      margin-right: 20px
    }
    div.container {
      margin: 0 20px auto
    }
  }
  </style>
  </head>
  <body>
  <div class="container">

<div class="item">
  <div class="item-right">
    <h2 class="num">23</h2>
    <p class="day">Feb</p>
    <span class="up-border"></span>
    <span class="down-border"></span>
  </div> 
  
  <div class="item-left">
    <p class="event">Music Event</p>
    <h2 class="title">Live In Sydney</h2>
    
    <div class="sce">
      <div class="icon">
        <i class="fa fa-table"></i>
      </div>
      <p>Monday 15th 2016 <br/> 15:20Pm & 11:00Am</p>
    </div>
    <div class="fix"></div>
    <div class="loc">
      <div class="icon">
        <i class="fa fa-map-marker"></i>
      </div>
      <p>North,Soth, United State , Amre <br/> Party Number 16,20</p>
    </div>
    <div class="fix"></div>
  </div> 
</div> 
</div>
  </body>
  </html>
  `;

    console.log("ndsbdjhdsgjhd");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlStr);
    await page.emulateMediaFeatures('screen');
    await page.pdf({
      path: "mypdf.pdf",
      format: "A4",
      printBackground: true,
      landscape: true
    });
    await browser.close();

    sendNotification(company[0].email, text);
    sendTicket(req.user.email, "hello", event[0]);

    return res.json(captureData);
  }
  console.log("Suuuuuuuuuuuuu")
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
