import { User } from "../../entities/User/User.js";
import { validateUser } from "../../utils/Validation/validData.js";
import { send } from "../../utils/Email/sendEmail.js";
import { resetPassword } from "../../utils/Authorization/resetPassword.js";
import  { DatabaseFind} from "../../database/DB_Functions/DatabaseFind.js"
import { Database } from "../../database/DB_Functions/Database.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const config = process.env;

import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  // console.log("sdjfbhsdhfjhaebfjbh");
  let full_name = req.body.full_name;
  let password = req.body.password;
  let passwordConfirm = req.body.passwordConfirm;
  let email = req.body.email;
  let profile_picture = req.body.profilePicture;
  let phone_number = req.body.phone_number;
  // console.log(req.body.birthday);
  let birthday = new Date(req.body.birthday);
  // let birthday = req.body.birthday;
  console.log(birthday);
  let country = req.body.country;
  let city = req.body.city;
  

  let db = new DatabaseFind();
  
  let data = await db.find_by_phone_number(phone_number);
  
  if (password !== passwordConfirm) {
    // console.log("4");
    return res.json("Confirm password");
  }
  else if(data){
    // console.log("5");
    return res.json("User exist");
  } 
  else {
    let usr = new User(full_name, email, country, city, "user",  phone_number, birthday,password, profile_picture );
    // if ((await validateUser(usr, res, req)) === true) {
      let token = jwt.sign({ usr }, process.env.SECRET_REGISTER);
      
      send(email, "Here is link for finish registration: ", `http://localhost:3000/api/auth/register/${token}`);
      // console.log(`http://localhost:3000/api/auth/register/${token}`);
      return res.send('Letter was send on your email');
    // }
  }
};

export const registerConfirm = (req, res) => {
  // console.log('registerConfirm');
  let token = req.params.token;
  let user = jwt.decode(token, process.env.SECRET_REGISTER);
  // let newToken = jwt.sign(user, process.env.TOKEN_KEY);
  let newUser = new User(user.usr.full_name, user.usr.email, user.usr.country, user.usr.city, user.usr.role, user.usr.phone_number, new Date(user.usr.birthday),  user.usr.password, user.usr.profile_picture );
  console.log(newUser)
  newUser.save();
  return res.json("user created");
};

export const loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let db = new DatabaseFind();
  let data = await db.find_by_email("User", email);
  // console.log("🚀 ~ file: authController.js:69 ~ loginUser ~ data:", data)
  if (data === null)
  {
    res.json("User does not exist");
    return;
  }
  let dbRole = new DatabaseFind();
  let roleData = await dbRole.find_by_id("Role", data[0].Role_ID);
  data[0].role = roleData[0].title;
  
  if (data) {
    if (!bcrypt.compareSync(password, data[0].password)) {
      return res.json("Wrong password");
    } else {
      const token = jwt.sign(
        {
          _id: data[0].User_ID,
          email: data[0].email,
          role: roleData[0].title,
          full_name: data[0].full_name,
          country: data[0].country, 
          city: data[0].city, 
          phone_number: data[0].phone_number, 
          birthday: data[0].birthday,
          profile_picture: data[0].profile_picture
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      console.log("🚀 ~ file: authController.js:99 ~ loginUser ~ token:", token)
      // console.log(data);
      return res.header("token", token).status(200).json({ auth: true, token: token, data });
    }
  }
  else {
    res.json("There no such user in database\nCheck your email or password and try again")
  }
};

export const logoutUser = (req, res) => {
  return res.status(200).json({ auth: false, token: null });
};

export const passwordReset = async (req, res) => {
  let email = req.body.email;
  let db = new DatabaseFind();
  let data = await db.find_by_email("User", email);
  
  if(!data)
  {
    return res.json("No people with this email.")
  }

  resetPassword(data[0]);
  return res.json("Reset password");
};

export const passwordResetConfirmToken = async (req, res) => {
  let currentToken = req.params.confirm_token;
  let id = parseInt(req.params.id);
  let user = new User();
  let db = new DatabaseFind();
  let database = new Database();
  let data = await db.find_by_id("User", id);

  let secret = user.password + "_" + config.SECRET_FOR_RESET_PASSWORD;
  let decoded = jwt.decode(currentToken, secret);
  
  if (decoded.user.User_ID === data[0].User_ID) {
    let newPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    database.update("User", "password", newPassword, data[0].User_ID);
    
    res.json("Password updated");
  }
};

// export const passwordReset = async (req, res) => {
//   let email = req.body.email;
//   console.log(email);
//   let user = new User();
//   await user.read_by_email(email);
//   // var playload = {
//   //   user: user
//   // };
//   // var secret = user.password + "-" + config.SECRET_FOR_RESET_PASSWORD;
//   // var token = jwt.encode(playload, secret); // google it!!!
//   // let text = "Here is link for reset password: ";
//   // let link = `http://localhost:3000/auth/password-reset/${token}/${rows[0].id}`;
//   // send(email, text, link);
//   resetPassword(user);
//   return res.json("Reset password");
// };

// export const passwordResetConfirmToken = async (req, res) => {
//   let newPassword = req.body.password;
//   let currentToken = req.params.confirm_token;
//   let id = parseInt(req.params.id);
//   let user = new User();

//   user.init(id);
//   user.read();
  
//   let secret = user.password + "_" + config.SECRET_FOR_RESET_PASSWORD;
//   let decoded = jwt.decode(currentToken, secret);

//   if (decoded.user.id === user.id) {
//     user.reset_password(newPassword);
//     res.send("Password updated");
//   }
// };

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



