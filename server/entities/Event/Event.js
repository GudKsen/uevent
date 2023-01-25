import { Database } from "../../database/DB_Functions/Database.js";

let database = new Database();

export class Event
{
    constructor(title, description, authorID, datetime, location, image, formatID)
    {
        this.title = title;
        this.description = description;
        this.authorID = authorID;
        this.datetime = datetime;
        this.location = location;
        this.image = image;
        this.formatID = formatID;
        
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
            // User_ID: this.authorID,
            dateTime: this.datetime,
            location: this.location,
            // categoryID: this.categoryID,
            poster: this.image,
            Format_ID: this.formatID
        }
        return obj;
    }

    async save ()
    {
        let id = await database.save("Event", this.transfer_data());
        console.log("id: " + id.insertId);
        // event theme

    }

    async read() {
        let data = await database.read("User", this.id);
        
        if (data.length) {
          this.title = data[0].title;
          this.description = data[0].description;
          this.authorID = data[0].authorID;
          this.datetime = data[0].datetime;
          this.location = data[0].location;
        //   this.categoryID = data[0].categoryID;
          this.image = data[0].image;
          this.formatID = data[0].formatID;
        }

        return data;
    }

    async update() {
        if (this.title.length > 0) await database.update("Event", "title", this.title, this.id);
        if (this.description.length > 0) await database.update("Event", "description", this.description, this.id);
        if (this.authorID.length > 0) await database.update("Event", "authorID", this.authorID, this.id);
        if (this.datetime.length > 0) await database.update("Event", "datetime", this.datetime, this.id);
        if (this.location.length > 0) await database.update("Event", "location", this.location, this.id);
        // if (this.categoryID.length > 0) await database.update("Event", "categoryID", this.categoryID, this.id);
        if (this.formatID.length > 0) await database.update("Event", "formatID", this.formatID, this.id);
    }

    async delete ()
    {
        await database.delete("Event", this.id);
    }
}

