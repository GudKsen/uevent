import { Database } from "../../database/DB_Functions/Database.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";

let database = new Database();
let databaseGet = new DatabaseGet();

export class Event
{
    constructor(title, description, authorID, datetime, location, image, formatID, theme)
    {
        this.title = title;
        this.description = description;
        this.authorID = authorID;
        this.datetime = datetime;
        this.location = location;
        this.image = image;
        this.formatID = formatID;
        this.theme = theme;
    }

    init (id)
    {
        this.id = id;
    }

    transfer_data ()
    {
        let obj = {
            title: this.title,
            description: this.description,
            Author_ID: this.authorID,
            dateTime: this.datetime,
            location: this.location,
            poster: this.image,
            Format_ID: this.formatID
        }
        return obj;
    }

    async save ()
    {
        let id = await database.save("Event", this.transfer_data());
        console.log("id: " + id.insertId);
        if (this.theme)
        {
            for (let i = 0; i < this.theme.length; i++)
            {
                let theme_obj = {
                    Theme_ID: this.theme[i],
                    Event_ID: id.insertId
                };
                database.save("Event_Theme", theme_obj);
            }
        }
    }

    async read() {
        //let data = await database.read("Event", this.id);
        let data = await databaseGet.get_events_with_themes_by_event_id(this.id);

        //console.log(data);
        
        if (data !== null) {
          this.title = data[0].title;
          this.description = data[0].description;
          this.authorID = data[0].Author_ID;
          this.datetime = data[0].datetime;
          this.location = data[0].location;
        //   this.categoryID = data[0].categoryID;
          this.image = data[0].image;
          this.formatID = data[0].formatID;
        }

        return data;
    }

    async update() {
        if (this.title) await database.update("Event", "title", this.title, this.id);
        if (this.description) await database.update("Event", "description", this.description, this.id);
        if (this.authorID) await database.update("Event", "Author_ID", this.authorID, this.id);
        if (this.datetime) await database.update("Event", "datetime", this.datetime, this.id);
        if (this.location) await database.update("Event", "location", this.location, this.id);
        if (this.formatID) await database.update("Event", "formatID", this.formatID, this.id);
    }

    async delete ()
    {
        await database.delete("Event", this.id);
    }

    async readAll ()
    {
        let d = await databaseGet.get_events_with_themes();
        // console.log(d);
        return d;
    }
}

