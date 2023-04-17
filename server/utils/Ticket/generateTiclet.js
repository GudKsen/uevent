export function generateTicket(event)
{

}

export function ticketToPdf()
{
    //     let htmlStr = `
//   <html>
//   <head>
//   <link href="https://fonts.googleapis.com/css?family=Cabin|Indie+Flower|Inknut+Antiqua|Lora|Ravi+Prakash" rel="stylesheet">
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"  />
//   <style>
//   * {
//   box-sizing: border-box;
//   margin:0;
//   padding:0;
// }
// body {
//   background:#DDD;
//   font-family: 'Inknut Antiqua', serif;
//   font-family: 'Ravi Prakash', cursive;
//   font-family: 'Lora', serif;
//   font-family: 'Indie Flower', cursive;
//   font-family: 'Cabin', sans-serif;
// }
//   div.container {
//     max-width: 3400px;
//     margin: 0 auto;
//     overflow: hidden
//   }

//   .image {
//     width: 100px;
//     height: 100px;
//   }

//   .container .item {
//     width: 41%;
//     float: left;
//     padding: 0 10px;
//     background: #fff;
//     overflow: hidden;
//     margin: 10px;
//   }
//   .container .item-right, .container .item-left {
//     float: left;
//     padding: 10px;
//     margin-left: 12px;
//   }
//   .container .item-right {
//     padding: 79px 50px;
    
//     width: 25%;
//     position: relative;
//     height: 286px
//   }
//   .container .item-right .up-border, .container .item-right .down-border {
//       padding: 14px 15px;
//       background-color: #ddd;
//       border-radius: 50%;
//       position: absolute
//   }
//   .container .item-right .up-border {
//     top: -8px;
//     right: -35px;
//   }
//   .container .item-right .down-border {
//     bottom: -13px;
//     right: -35px;
//   }
//   .container .item-right .num {
//     font-size: 60px;
//     text-align: center;
//     color: #111
//   }
//   .container .item-right .day, .container .item-left .event {
//     color: #555;
//     font-size: 20px;
//     margin-bottom: 9px;
//   }
//   .container .item-right .day {
//     text-align: center;
//     font-size: 25px;
//   }
//   .container .item-left {
//     width: 71%;
//     padding: 34px 0px 19px 46px;
//     border-left: 3px dotted #999;
//   } 
//   .container .item-left .title {
//     color: #111;
//     font-size: 34px;
//     margin-bottom: 12px
//   }
//   .container .item-left .sce {
//     margin-top: 5px;
//     display: block
//   }
//   .container .item-left .sce .icon, .container .item-left .sce p,
//   .container .item-left .loc .icon, .container .item-left .loc p{
//       float: left;
//       word-spacing: 5px;
//       letter-spacing: 1px;
//       color: #888;
//       margin-bottom: 10px;
//   }
//   .container .item-left .sce .icon, .container .item-left .loc .icon {
//     margin-right: 10px;
//     font-size: 20px;
//     color: #666
//   }
//   .container .item-left .loc {display: block}
//   .fix {clear: both}
//   .container .item .tickets, .booked, .cancel{
//       color: #fff;
//       padding: 6px 14px;
//       float: right;
//       margin-top: 10px;
//       font-size: 18px;
//       border: none;
//       cursor: pointer
//   }
//   .container .item .tickets {background: #777}
//   .container .item .booked {background: #3D71E9}
//   .container .item .cancel {background: #DF5454}
//   .linethrough {text-decoration: line-through}
//   @media only screen and (max-width: 1150px) {
//     .container .item {
//       width: 100%;
//       margin-right: 20px
//     }
//     div.container {
//       margin: 0 20px auto
//     }
//   }
//   </style>
//   </head>
//   <body>
//   <div class="container">

// <div class="item">
//   <div class="item-right">
//     <img class="image" src="data:C:\Users\Tb\Desktop\\uevent\server\public\QRCodes\qr_880.png;base64,BINARY_CHUNKS"></img>
//     <span class="up-border"></span>
//     <span class="down-border"></span>
//   </div> 
  
//   <div class="item-left">
//     <p class="event">Music Event</p>
//     <h2 class="title">`
    
//     +event[0].title + 
//     `</h2>
    
//     <div class="sce">
//       <div class="icon">
//         <i class="fa fa-table"></i>
//       </div>
//       <p>`+ new Date(event[0].startDateTime).toLocaleDateString()  +` <br/> `
//       +  new Date(event[0].startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })  
//       +`</p>
//     </div>
//     <div class="fix"></div>
//     <div class="loc">
//       <div class="icon">
//         <i class="fa fa-map-marker"></i>
//       </div>
//       <p>` 
//       + data_location[0].country + 
//       `</p>
//     </div>
//     <div class="fix"></div>
//   </div> 
// </div> 
// </div>
//   </body>
//   </html>
//   `;
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // await page.setContent(htmlStr);
    // await page.emulateMediaFeatures('screen');
    // await page.pdf({
    //   path: "mypdf.pdf",
    //   format: "A4",
    //   printBackground: true,
    //   landscape: true
    // });
    // await browser.close();
}