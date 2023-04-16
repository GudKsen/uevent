import { Company } from "../../entities/Company/Company.js";
import { Location } from "../../entities/Location/Location.js";
import { User } from "../../entities/User/User.js";
import { DatabaseFind } from "../../database/DB_Functions/DatabaseFind.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { Event } from "../../entities/Event/Event.js";
import { GetEvents } from "../../entities/Event/GetEvents.js";
import { send } from "../../utils/Email/sendEmail.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const generateConfirmNumber = async (req, res) => {
  let generCod = parseInt(Math.random() * (999999 - 100000) + 100000);

  let number = jwt.sign({ generCod }, process.env.SECRET_REGISTER);
  let email = req.body.email;
  console.log(email);
  console.log(number);
  send(email, `Enter these numbers to confirm the creation of the organization:\n ${generCod}`);
  res.json(number);
}

export const CreateCompany = async (req, res) => {

  console.log(req.body.code);

  let geCode = jwt.decode(req.body.genCode, process.env.SECRET_REGISTER);
  console.log(geCode.generCod);
  let string;

  if(parseInt(req.body.code) != parseInt(geCode.generCod)){
    string = "Enter correct cod."
    return res.json(string);
      
  } 

  if (req.user.role === "organizer") {
    return res.json("You already have a company and can't create one more.");
    
  }

  let name = req.body.name;
  let description = req.body.description;
  let email = req.body.email;

  let getData = new DatabaseFind();
  let findCompany = await getData.find_by_email("Company", email);
  if (findCompany) {
     res.send("Company already exists");
    
  }

  let userID = req.user._id;

  let street_number = req.body.street_number;
  let address_line_street = req.body.street;
  let address_line_2 = req.body.state;
  let city = req.body.city;
  let country = req.body.country;

  let location = new Location(
    street_number,
    address_line_street,
    address_line_2,
    city,
    country
  );
  let id_location = await location.create();

  let company = new Company(name, description, email, id_location);

  let user = new User();

  user.init(userID);
  user.role = "organizer";
  user.update();
  console.log("Created company");
  company.create(userID);
  string = "Company was created."
  return res.json(string);
};

export const GetCompanyByUser = async (req, res) => {
  let userID = req.user._id;
  let db = new DatabaseGet();
  let data = await db.get_company_by_userID(userID);
  let location = new Location();
  location.init(data[0].Location_ID);
  let dataLocation = await location.read();

  res.json({ data, dataLocation });
};

export const GetCompany = async (req, res) => {
  let id = parseInt(req.params.id);
  let company = new Company();

  company.init(id);

  try {
    let data = await company.read();
    res.send(data);
  } catch (err) {
    res.send("Error");
  }
  // let userID = req.user._id;
  // let db = new DatabaseGet();
  // let data = await db.get_company_by_userID(userID);
  // let location = new Location();
  // location.init(data[0].Location_ID);
  // let dataLocation = await location.read();

  // res.json({ data, dataLocation });
};

export const GetCompanyById = async (req, res) => {
  let id = parseInt(req.params.id);
 
  let db = new DatabaseGet();
  let data = await db.get_company_by_ID(id);
  let location = new Location();
  location.init(data[0].Location_ID);
  let dataLocation = await location.read();

  res.json({ data, dataLocation });
};

GetCompanyById

export const GetCompanies = async (req, res) => {
  let company = new Company();
  let data = await company.readAll();
  res.json(data);
};

export const UpdateCompany = async (req, res) => {
  let id = parseInt(req.params.id);
  let title = req.body.title;
  let description = req.body.description;
  let email = req.body.email;
  let location = req.body.location;
  let image = req.file;

  let imageName = null;
  if (image !== null && image !== undefined) {
    imageName = image.filename;
  } else {
    imageName = null;
  }

  let company = new Company(title, description, email, location, imageName);
  company.init(id);
  company.update();
  let data = await company.read();
  res.json(data);
};

export const DeleteCompany = (req, res) => {
  let id = parseInt(req.params.id);
  let company = new Company();
  //TODO: change user role when delete
  company.init(id);
  company.delete();
  res.json("company deleted");
};

export const GetEventsByCompany = (req, res) => {
  let id = parseInt(req.params.id);
  let event = new GetEvents();
  let events = event.GetEventsByCompany(id);
  if (events) {
    res.status(200).json(events);
  } else {
    res.status(404).json([]);
  }
};

export const UpdateAvatar = (req, res) => {
  let id = parseInt(req.params.id);
  let image = req.file;

  let company = new Company();

  company.init(id);

  let imageName = null;
  if (image !== null && image !== undefined) {
    imageName = image.filename;
  } else {
    imageName = null;
  }
};
