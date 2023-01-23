import { Database } from "../../database/DB_Functions/Database.js"
let database = new Database();


export class Format
{
    constructor (title, description) {
        this.title = title;
        this.description = description;
    }

    init(id) {
        this.id = id;
    }

    transfer_data() {
        let obj = {
          title: this.title,
          description: this.description
        };
        return obj;
    }

    create () {
        database.save('Format', this.transfer_data());
    }

    read () {
        return database.read('Format', this.id);
    }

    readAll () {
        return database.readAll("Format");
    }

    async update () {
        if (this.title) await database.update('Format', 'title', this.title, this.id);
        if (this.description) await database.update('Format', 'description', this.description, this.id);
    }

    async delete () {
        await database.delete('Format', this.id);
    }
}

