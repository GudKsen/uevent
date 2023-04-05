import { User } from "../../entities/User/User.js";
import fs from 'fs'
import path from "path";
import { deleteprof } from "../../utils/User/deleteprof.js";

export const GetUsers = async (req, res) => {
  let user = new User();
  let data = await user.readAll();
  res.json(data);
};

export const GetUser = async (req, res) => {
  let id = parseInt(req.params.id);
  let user = new User();

  user.init(id);
  let data = await user.read();
  data[0].role = user.role;
  res.json(data);
};

export const CreateUser = async (req, res) => {
  let full_name = req.body.full_name;
  let password = req.body.password;
  let phone_number = req.body.phone_number;
  let birthday = req.body.birthday;
  let address = req.body.address;
  let email = req.body.email;
  let role = req.body.role;
  let profilePicture = "h";

  let user = new User(full_name, email, address, role, phone_number, birthday, password, profilePicture);

  user.save();
  res.send("Created");
};

export const UpdateUser = async(req, res) => {
  let full_name = req.body.full_name;
  let password = req.body.password;
  let phone_number = req.body.phone_number;
  let birthday = req.body.birthday;
  let email = req.body.email;
  let role = req.body.role;
  let profilePicture = req.file;
  let country = req.body.country;
  let city = req.body.city;
  let id = parseInt(req.params.id);

  let imageName = null;
  if (profilePicture !== null && profilePicture !== undefined) {
    imageName = profilePicture.filename;
  } else {
    imageName = null;
  }

  let userNew = new User(full_name, email, country, city, role, phone_number, birthday, password, imageName);
  let userOld = new User();
  
  userOld.init(id);
  await userOld.read();
  if (userOld.profile_picture && userOld.profile_picture !== undefined) 
  {
    let pathImg = path.resolve("public/avatars", `${userOld.profile_picture}`);
    fs.readFile(pathImg, (err, data) => {
      if (!err && data) {
        fs.unlinkSync(pathImg);
      }
    })
  }

  userNew.init(id);
  await userNew.update();
  await userNew.read();
  console.log("🚀 ~ file: UserController.js:78 ~ UpdateUser ~ userNew:", userNew)
  
  res.send(userNew);
};

export const UpdateUserAvatar = async (req, res) => {
  let full_name = req.body.full_name;
  let picture = req.file;
  let path = `${picture.destination}` + `${picture.filename}`;
  path = path.toString();
  path = path.slice(2);
  let isOkay = updateAvatar(full_name, path);

  if (isOkay === "true") {
    res.send("Success: avatar updated");
  } else {
    res.send("Error: can't update");
  }
};

export const DeleteProfile = async (req, res) => {
  let email = req.body.email;
  // console.log(email);
  // let user = new User();
  let db = new DatabaseFind();
  let data = await db.find_by_email("User", email);
  // console.log(data[0]);
  if(!data){
    return res.json("No people with this email.")
  }
  deleteprof(data[0]);
  return res.json("Reset password");
};


//это, если мы будем делать через всплывающее окно или второе окно, если с конфирмом

export const DeleteUser = async (req, res) => {

  let database = new Database();
  let deleteId = parseInt(req.params.id);

  database.delete("User", deleteId);

  // let deleteId = parseInt(req.params.id);
  // let user = new User();

  // user.init(deleteId);
  // user.delete();
  console.log("user deleted");
  res.json("User deleted");
};