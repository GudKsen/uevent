import express from "express";
import bodyParser from "body-parser";
import path from "path";

import event from "./routes/event.js";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import theme from "./routes/theme.js";
// import category from "./routes/category.js";
import company from "./routes/company.js";
import format from "./routes/format.js";

import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 8000;

const __dirname = path.resolve();

app.use(cors());

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use(event);
app.use(user);
app.use(auth);
app.use(theme);
// app.use(category);
app.use(company);
app.use(format);

app.all("*", (req, res) => {
    res.status(404).send('404! Page not found');
  })
  
app.listen(PORT, () => {
    console.log("Server is running...");
});

