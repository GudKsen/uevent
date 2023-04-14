import nodemailer from "nodemailer";

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

export function sendTicket(email, text, data) {
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
    subject: "New password",
    html: `
    <html>
    <head>
   
    </head>

    <body style="div.container {
      max-width: 1350px;
      margin: 0 auto;
      overflow: hidden
    }
    .upcomming {
      font-size: 45px;
      text-transform: uppercase;
      border-left: 14px solid rgba(255, 235, 59, 0.78);
      padding-left: 12px;
      margin: 18px 8px;
    }
    .container .item {
      width: 48%;
      float: left;
      padding: 0 20px;
      background: #fff;
      overflow: hidden;
      margin: 10px
    }
    .container .item-right, .container .item-left {
      float: left;
      padding: 20px 
    }
    .container .item-right {
      padding: 79px 50px;
      margin-right: 20px;
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
    }">
    <div class="item">
    <div class="item-right">
      <p class="num">23</p>
      <p class="day">Feb</p>
      <span class="up-border"></span>
      <span class="down-border"></span>
    </div> <!-- end item-right -->
    
    <div class="item-left">
      <p class="event">Music Kaboom</p>
      <p class="title">Music Party</p>
      
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
      
    </div> <!-- end item-right -->
  </div> <!-- end item -->
    </body>
    
    </html>
    `
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
