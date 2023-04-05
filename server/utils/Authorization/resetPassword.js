import jwt from "jwt-simple";
import { send } from "../Email/sendEmail.js";

const config = process.env;

export function resetPassword(user) {
  var playload = {
    user: user
  };
  var secret = user.password + "-" + config.SECRET_FOR_RESET_PASSWORD;
  var token = jwt.encode(playload, secret);

  let text = "Here is link for reset password: ";
  let link = `http://localhost:3000/api/auth/password-reset/${token}/${user.User_ID}`;
  send(user.email, text, link);
}
