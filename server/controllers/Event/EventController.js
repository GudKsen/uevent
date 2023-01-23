import { Event } from "../entities/event.js"
// import { setEndTimeEvent } from "../utils/setEndTimeEvent.js";
// import { toLocalDate } from "../utils/toLocalDate.js";

export const CreateEvent = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let author = req.user._id;
    let time = req.body.time;
    let date = req.body.date;
    let location = req.body.location;
    let category = req.body.category;
    let image = req.body.image;
    let format = req.body.format;

    let event = new Event(title, description, author, time, date, location, category, image, format);
    
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

    let event = new Event(title, description, author, time, date, location, category, image, format);
    event.init(id);
    event.update(title);
    res.send('Updated');
}

export const GetEvents = (req, res) =>{

}

export const GetCommentsEvent = (req, res) => {

};
