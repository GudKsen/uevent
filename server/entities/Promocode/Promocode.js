import { Database } from "../../database/DB_Functions/Database.js"
let database = new Database();


export class Promocode
{
    constructor (title, description, discont, startDateTime, endDateTime, User_ID) {
        this.title = title;
        this.description = description;
        this.discont = discont;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.User_ID = User_ID;
    }

    init(id) {
        this.id = id;
    }

    transfer_data() {
        let obj = {
          title: this.title,
          description: this.description,
          discount: this.discont,
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime,
          Company_ID: this.User_ID
        };
        return obj;
    }

    create () {
        database.save('Promocode', this.transfer_data());
    }

    read () {
        return database.read('Promocode', this.id);
    }

    readAll () {
        return database.readAll("Promocode");
    }

    async update () {
        if (this.title) await database.update('Promocode', 'title', this.title, this.id);
        if (this.description) await database.update('Promocode', 'description', this.description, this.id);
        if (this.description) await database.update('Promocode', 'discont', this.discont, this.id);
    }

    async delete () {
        await database.delete('Promocode', this.id);
    }
}

