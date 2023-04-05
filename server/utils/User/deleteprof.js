import jwt from "jwt-simple";
// import jwt from "jsonwebtoken";
import { send } from "../Email/sendEmail.js";

const config = process.env;

export function deleteprof(user) {
//   var playload = {
//     user: user
//   };
//   var secret = user.password + "-" + config.SECRET_FOR_RESET_PASSWORD;
//   var token = jwt.encode(playload, secret);

  // console.log(user);
//   console.log(user.email);
//   console.log(user.User_ID);

  // let token = jwt.sign({ user }, process.env.SECRET_REGISTER);
  let text = "Are you sure you want to remove the password?\n If yes, click on the link below.\n Remember, you can always return to us again.";
  let link = `http://localhost:3000/api/user/${user.User_ID}`;
  send(user.email, text, link);
}
