import { DatabaseFind } from "../../database/DB_Functions/DatabaseFind.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { Event } from "../../entities/Event/Event.js";
import { GetEvents as GetEventsClass} from "../../entities/Event/GetEvents.js";
import { Location } from "../../entities/Location/Location.js";
import { User } from "../../entities/User/User.js";
import { Promocode } from "../../entities/Promocode/Promocode.js";
import { Database } from "../../database/DB_Functions/Database.js";
// import { setEndTimeEvent } from "../utils/setEndTimeEvent.js";
// import { toLocalDate } from "../utils/toLocalDate.js";

let db = new DatabaseFind();

export const SetSubscribe = async (req, res) => {
  
    let author = req.user._id;
  
    let companyId = req.body.companyId;
   
    let baba = new Database();
    await baba.save("Subscribed_User", {
      User_ID: req.user._id,
      Company_ID: req.body.companyId
    })
    
    res.json("Event created");
};

export const ExploreSubscribe = async (req, res) => {
  
    let author = req.user._id;
  
    let companyId = req.body.companyId;
   
    let baba = new Database();
    let answer = await baba.availabeSub("Subscribed_User", 
    "User", req.user._id,
    "Company", req.body.companyId)

    console.log("\n---------------\n-------------------------\n")
    console.log(answer)
    console.log("\n---------------\n-------------------------\n")
    
    res.json(answer);
};

export const DeleteSubscribe = async (req, res) => {
  
    let author = req.user._id;
  
    let companyId = req.body.companyId;
   
    let baba = new Database();
    await baba.deleteSub("Subscribed_User", 
      "User", req.user._id,
      "Company", req.body.companyId
    )
    
    res.json("Event created");
};

export const GetSubscribe = async (req, res) => {
  
    let author = req.user._id;
  
    let companyId = req.body.companyId;
   
    let baba = new Database();
    let subcribe = await baba.readSub("Subscribed_User", 
      "User", req.user._id
    )
    
    res.json(subcribe);
};

  