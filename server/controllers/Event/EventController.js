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

export const CreateEvent = async (req, res) => {
  
  let title = req.body.title;
  let description = req.body.description;
  let author = req.user._id;
  let time = req.body.time;
  let date = req.body.date;
  let image = req.file;
  let format = req.body.format;
  let themes = JSON.parse(req.body.themes);
  let endDate = req.body.endDate;
  let country = req.body.country;
  let state = req.body.state;
  let city = req.body.city;
  let street = req.body.street;
  let street_number = req.body.street_number;
  let publish_date = req.body.publish_date;
  let duration = req.body.duration;
  let price = req.body.price;
  let currency = req.body.currency;

  let promocodeId = req.body.promocodeId;
 
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });
    return;
  } 
  else if (!req.body.description) {
    res.status(400).send({
      message: "Description can not be empty!",
    });
    return;
  } 
  else if (!req.body.format) {
    res.status(400).send({
      message: "Format can not be empty!",
    });
    return;
  }
  else if (!req.body.date) {
    res.status(400).send({
      message: "Date can not be empty!",
    });
    return;
  }
  else if (!req.body.time) {
    res.status(400).send({
      message: "Time can not be empty!",
    });
    return;
  }
  else if (!req.body.themes) {
    res.status(400).send({
      message: "Themes can not be empty!",
    });
    return;
  }

  for (let i = 0; i < themes.length; i++) {
    let isExistTheme = await db.find_by_id("Theme", themes[i]);
    if (isExistTheme === null) {
      res.json("Error: theme doesn't exist");
      return;
    }
  }

  let datetime = new Date(date + "T" + time);

  let imageName = null;
  if (image !== null && image !== undefined) {
    imageName = image.filename;
  } else {
    imageName = null;
  }

  let location = new Location(street_number, street, state, city, country);
  let locationID = await location.create();

  let user = new User();
  user.init(author);
  
  let company = await user.getCompanyData();
 
  let event = new Event(
    title,
    description,
    company[0].Company_ID,
    datetime,
    locationID,
    imageName,
    format,
    themes,
    new Date(endDate),
    publish_date,
    price,
    currency
  );
  console.log("🚀 ~ file: EventController.js:109 ~ CreateEvent ~ event:", event)

  

  let eventId = await event.save();
  let baba = new Database();
  baba.save("Event_Promocode", {
    Event_ID: eventId,
    Promocode_ID: promocodeId
  })
  
  res.json("Event created");
};

export const GetEvent = async (req, res) => {
  let id = parseInt(req.params.id);
  let event = new Event();

  event.init(id);

  try {
    let data = await event.read();
    
    // data[0].beginDate = toLocalDate(data[0].beginDate);
    // if (data[0].endDate) data[0].endDate = toLocalDate(data[0].endDate);
    console.log("hjgfhgfhgf " + data);
    res.json(data);
  } catch (err) {
    res.json(err.message);
  }
};

export const DeleteEvent = (req, res) => {
  let id = parseInt(req.params.id);
  let event = new Event();

  event.init(id);
  event.delete();
  res.send("Event deleted");
};

export const UpdateEvent = (req, res) => {
  let id = parseInt(req.params.id);
  let title = req.body.title;
  let description = req.body.description;
  // let author = req.user._id;
  let time = req.body.time;
  let date = req.body.date;
  let location = req.body.location;
  let category = req.body.category;
  let image = req.body.image;
  let format = req.body.format;
  let author = req.body.author;
  let themes;
  if (req.body.themes) {
    themes = req.body.themes.split(",");
  }

  let dateTime;
  if (date && time) {
    dateTime = new Date(date + "T" + time);
    dateTime = dateTime.toISOString().slice(0, 19).replace("T", " ");
  } else {
    dateTime = null;
  }

  let event = new Event(
    title,
    description,
    author,
    dateTime,
    location,
    category,
    image,
    format,
    themes
  );
  event.init(id);
  event.update();
  res.send("Updated");
};

export const GetEvents = async (req, res) => {
  let events = new Event();
  let e = await events.readAll();
  if(e){
    e.sort(function (a, b) {
      if (a.dateTime < b.dateTime)
      {
       return -1;
      } 
      else if (a.dateTime > b.dateTime)
      {
       return 1;
      }
      else 
      {
       return 0;
      }
     })
  }
  res.json(e);
};

export const GetCommentsEvent = async (req, res) => {
  let id = parseInt(req.params.id);
  let dataGet = new DatabaseGet();
  let data = await dataGet.get_comments_by_event_id(id);
  res.json(data);
};

export const GetEventsByCompanyId = async (req, res) =>
{
  console.log(req.params.id);
  let id = parseInt(req.params.id);
  // console.log(id);
  let db = new DatabaseGet();
  let events = await db.get_events_by_company(id);
  console.log(events);
  res.json(events);
}

export const GetNewsByCompanyId = async (req, res) =>
{
  console.log(req.params.id);
  let id = parseInt(req.params.id);
  // console.log(id);
  let db = new DatabaseGet();
  let events = await db.get_news_by_company(id);
  console.log("-----------------------------------------------------------")
  console.log(events);
  console.log("---------------------------------------------------------------")
  res.json(events);
}

export const CreateCommentEvent = (req, res) => {};

export const GetEventsByCountry = async (req, res) => {
  let country = req.query.country;
  console.log(country);
  let events = new GetEventsClass();
  
  let data = await events.GetEventsByCountry(country);
  if (data === null)
  {
    return res.json([]);
  }
  data.sort(function (a, b) {
    if (a.dateTime < b.dateTime)
    {
     return -1;
    } 
    else if (a.dateTime > b.dateTime)
    {
     return 1;
    }
    else 
    {
     return 0;
    }
   })
  return res.json(data);
}


export const BuyTicket = (req, res) => {
  
}