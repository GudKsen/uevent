import { User } from "../../entities/User/User.js";

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
  res.json(data);
};

export const DeleteUser = async (req, res) => {
  let deleteId = parseInt(req.params.id);
  let user = new User();

  user.init(deleteId);
  user.delete();
  res.json("User deleted");
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

export const UpdateUser = (req, res) => {
  let full_name = req.body.full_name;
  let password = req.body.password;
  let phone_number = req.body.phone_number;
  let birthday = req.body.birthday;
  let address = req.body.address;
  let email = req.body.email;
  let role = req.body.role;
  let profilePicture = "h";
  let id = parseInt(req.params.id);

  let user = new User(full_name, email, address, role, phone_number, birthday, password, profilePicture);

  user.init(id);
  user.update();
  res.send("User updated");
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
