import { Database } from "../../database/DB_Functions/Database.js"
let database = new Database();


export class Company
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
        database.save('Company', this.transfer_data());
    }

    read () {
        return database.read('Company', this.id);
    }

    readAll () {
        return database.readAll("Company");
    }

    async update () {
        if (this.title) await database.update('Company', 'title', this.title, this.id);
        if (this.description) await database.update('Company', 'description', this.description, this.id);
    }

    async delete () {
        await database.delete('Company', this.id);
    }
}

