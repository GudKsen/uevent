import { Database } from "../../database/DB_Functions/Database.js"
let database = new Database();


export class Theme
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
        database.save('Theme', this.transfer_data());
    }

    read () {
        return database.read('Theme', this.id);
    }

    readAll () {
        return database.readAll("Theme");
    }

    async update () {
        if (this.title) await database.update('Theme', 'title', this.title, this.id);
        if (this.description) await database.update('Theme', 'description', this.description, this.id);
    }

    async delete () {
        await database.delete('Theme', this.id);
    }
}

