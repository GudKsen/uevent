import { createCanvas, loadImage  } from "canvas";
import fs from "fs";

// import { formatTitle }  from "./format-title.js";
import { formatTitle } from "./formatTitle.js";

const post = {
    title: "Draw and save images with Canvas and Node",
    author: "Sean C Davis",
  };

export function Canva(data) {
  console.log("🚀 ~ file: canvas.js:13 ~ Canva ~ data:", data)
  // Move the title formatter up farther because we're going to
// use it to set our Y values.
const titleText = formatTitle(data[0].title);
console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
const width = 1200;
const height = 627;
const imagePosition = {
  w: 200,
  h: 200,
  x: 100,
    // Calculate the Y of the image based on the number of
    // lines in the title.
    y: titleText.length === 2 ? 75 : 100,
};
// Do the same with the title's Y value.
const titleY = titleText.length === 2 ? 200 : 250;
const titleLineHeight = 100;
// And the author's Y value.
const authorY = titleText.length === 2 ? 425 : 400;

const dateY = titleText.length === 2 ? 475 : 450;
const timeY = titleText.length === 2 ? 525 : 500;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

context.fillStyle = "#764abc";
context.fillRect(0, 0, width, height);

context.font = "bold 30pt 'PT Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";

context.fillText(titleText[0], 600, titleY);
if (titleText[1]) context.fillText(titleText[1], 600, titleY + titleLineHeight);

context.font = "20pt 'PT Sans'";
context.fillText(`by ${data[0].company[0].name}`, 600, authorY);
context.fillText(`date: ${new Date(data[0].startDateTime).toLocaleDateString()}`, 600, dateY);
context.fillText(`time: ${new Date(data[0].startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 900, dateY);
context.fillText(`place: ${data[0].location[0].country}, ${data[0].location[0].address_line_state}, ${data[0].location[0].address_line_street}, ${data[0].location[0].street_number}`, 600, timeY);
loadImage("./utils/QRCode/images/img.png").then((image) => {
  const { w, h, x, y } = imagePosition;
  context.drawImage(image, x, y, w, h);

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./image.png", buffer);
});
}
