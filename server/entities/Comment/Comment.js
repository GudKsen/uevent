import { Database } from "../../database/DB_Functions/Database.js";
let database = new Database();

export class Comment
{
    constructor (content, date, authorID, eventID) {
        this.content = content;
        this.date = date;
        this.authorID = authorID;
        this.eventID = eventID;
    }

    init(id) {
        this.id = id;
    }

    transfer_data() {
        let obj = {
          content: this.content,
          date: this.date,
          User_ID: this.authorID,
          Event_ID: this.eventID
        };
        return obj;
    }

    async save () {
        database.save('Comment', this.transfer_data());
    }

    read () {
        return database.read('Comment', this.id);
    }

    readAll () {
        return database.readAll("Comment");
    }

    async update () {
        // if (this.title) await database.update('Comment', 'title', this.title, this.id);
        // if (this.description) await database.update('Comment', 'description', this.description, this.id);
    }

    async delete () {
        await database.delete('Comment', this.id);
    }
}

