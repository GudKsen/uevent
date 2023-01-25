import { DatabaseFind } from "../../database/DB_Functions/DatabaseFind.js";
import { Event } from "../../entities/Event/Event.js"
// import { setEndTimeEvent } from "../utils/setEndTimeEvent.js";
// import { toLocalDate } from "../utils/toLocalDate.js";

let database = new DatabaseFind();

export const CreateEvent = async (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    // let author = req.user._id;
    let author = 1;
    let time = req.body.time;
    let date = req.body.date;
    let location = req.body.location;
    let category = req.body.category;
    let image = req.body.image;
    let format = req.body.format;
    let themes = req.body.themes.split(',');

    for (let i = 0; i < themes.length; i++) {
        let isExistTheme = await database.find_by_title("Theme", themes[i]);
        if (isExistTheme === null) {
          res.json("Error: theme doesn't exist");
          return;
        }
    }

    let datetime = new Date(date + "T" + time);
    console.log(datetime);

    let event = new Event(title, description, author, datetime, location, image, format, themes);
    
    event.save();
    res.json('Event created');
}

export const GetEvent = async (req, res) => {
    let id = parseInt(req.params.id);
    let event = new Event();

    event.init(id);
    
    try {
        let data = await event.read();
        // data[0].beginDate = toLocalDate(data[0].beginDate);
        // if (data[0].endDate) data[0].endDate = toLocalDate(data[0].endDate);
        
        res.json(data);
    } catch (err) {
        res.json(err.message);
    }
}

export const DeleteEvent = (req, res) => {
    let id = parseInt(req.params.id);
    let event = new Event();

    event.init(id);
    event.delete();
    res.send('Event deleted');
}

export const UpdateEvent = (req, res) => {
    let id = parseInt(req.params.id);
    let title = req.body.title;
    let description = req.body.description;
    let author = req.user._id;
    let time = req.body.time;
    let date = req.body.date;
    let location = req.body.location;
    let category = req.body.category;
    let image = req.body.image;
    let format = req.body.format;
    let themes = req.body.themes.split(',');

    let event = new Event(title, description, author, time, date, location, category, image, format);
    event.init(id);
    event.update(title);
    res.send('Updated');
}

export const GetEvents = (req, res) => {
    let events = new Event();
    //events.readAll();
}

export const GetCommentsEvent = (req, res) => {

};

export const CreateCommentEvent = (req, res) => {

};
