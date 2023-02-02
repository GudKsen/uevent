import { User } from "../../entities/User/User.js";
import { validateUser } from "../../utils/Validation/validData.js";
import { send } from "../../utils/Email/sendEmail.js";
import { resetPassword } from "../../utils/Authorization/resetPassword.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const config = process.env;

import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  //let login = req.body.login;
  let password = req.body.password;
  let passwordConfirm = req.body.passwordConfirm;
  let full_name = req.body.full_name;
  let email = req.body.email;
  let profile_picture = req.body.profilePicture;
  let user = new User();

  let data = await user.read_by_login(login);

  if (password !== passwordConfirm) {
    return res.json("Confirm password");
  }
  else if(!data){
    return res.json("User exist");
  } 
  else {
    let usr = new User(login, password, full_name, email, profile_picture);
    if ((await validateUser(usr, res, req)) === true) {
      let token = jwt.sign({ usr }, process.env.SECRET_REGISTER);
      send(email, "Here is link for finish registration: ", `http://localhost:3000/api/auth/register/${token}`);
      return res.json('Letter was send on your email');
    }
  }
};

export const registerConfirm = (req, res) => {
  let token = req.params.token;
  let user = jwt.decode(token, process.env.SECRET_REGISTER);
  let newToken = jwt.sign(user, process.env.TOKEN_KEY);
  let newUser = new User(user.usr.login, user.usr.password, user.usr.full_name, user.usr.email, user.usr.profile_picture);
  
  newUser.save();
  return res.json("user creared");
};

export const loginUser = async (req, res) => {
  let login = req.body.login;
  let password = req.body.password;

  let user = new User(login, password);

  let data = await user.read_by_login(login);
  console.log(data);
  if (data !== [] && user.password && data[0].password) {
    if (!bcrypt.compareSync(user.password, data[0].password)) {
      return res.json("Wrong password");
    } else {
      const token = jwt.sign(
        {
          _id: data[0].User_ID,
          email: data[0].email,
          role: data[0].role,
          login: data[0].login,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
  
      return res.header("token", token).status(200).json({ auth: true, token: token, data });
    }
  }
  else {
    res.json("There are no password in database. \nIt seems that you don't finish your registration.")
  }
};

export const logoutUser = (req, res) => {
  return res.status(200).json({ auth: false, token: null });
};

export const passwordReset = async (req, res) => {
  let email = req.body.email;
  console.log(email);
  let user = new User();
  await user.read_by_email(email);
  // var playload = {
  //   user: user
  // };
  // var secret = user.password + "-" + config.SECRET_FOR_RESET_PASSWORD;
  // var token = jwt.encode(playload, secret); // google it!!!
  // let text = "Here is link for reset password: ";
  // let link = `http://localhost:3000/auth/password-reset/${token}/${rows[0].id}`;
  // send(email, text, link);
  resetPassword(user);
  return res.json("Reset password");
};

export const passwordResetConfirmToken = async (req, res) => {
  let newPassword = req.body.password;
  let currentToken = req.params.confirm_token;
  let id = parseInt(req.params.id);
  let user = new User();

  user.init(id);
  user.read();
  
  let secret = user.password + "_" + config.SECRET_FOR_RESET_PASSWORD;
  let decoded = jwt.decode(currentToken, secret);

  if (decoded.user.id === user.id) {
    user.reset_password(newPassword);
    res.send("Password updated");
  }
};

export const deleteAccount = async (req, res) => {
  let login = req.body.login;
  let password = req.body.password;
  let user = new User(login, password);

  let data = await findUserInDb(user, req, res);
  if (!bcrypt.compareSync(user.password, data[0].password)) {
    return res.json("Wrong password");
  } else {
    if (data === "not found") {
      return res.json("Error: user does not exist or you don't have access rights");
    } else {
      let token = jwt.sign(
        { user: data[0] },
        process.env.SECRET_FOR_DELETE_ACCOUNT
      );
      let text = "Are you sure you want to delete the account?";
      let link = `http://localhost:3000/api/auth/delete-account-confirm/${token}/${data[0].id}`;
      send(data[0].email, text, link);
      return res.json(
        "Success: confirm link send on your email, follow it to finish deleting your account"
      );
    }
  }
};

// export const deleteAccountConfirm = async (req, res) => {
//   let currentToken = req.params.confirm_token;
//   let id = req.params.id;
//   let user = await getDataFromDBByID("user", id, res);
//   let secret = config.SECRET_FOR_DELETE_ACCOUNT;

//   let decoded = jwt.decode(currentToken, secret);

//   if (decoded.user.id === user[0].id) {
//       try {
//         deleteFromDB("Posts", "author", user[0].login, res);
//         deleteFromDB("Comments", "author", user[0].login, res);
//         deleteFromDB("LikesPosts", "author", user[0].login, res);
//         deleteFromDB("LikesComments", "author", user[0].login, res);
//         deleteUserFromDBById(user[0].id, "user", res);
//         res.send("Success: user and all information deleted");
//       } catch (err) {
//         console.log(err.message);
//         return res.json("Error: can't delete");
//       }
//     } else {
//       return res.json("Error: invalid option for deleting");
//     }
// };



