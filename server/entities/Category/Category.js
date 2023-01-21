import { Database } from "../../database/DB_Functions/Database.js";
let database = new Database();

export class Category {

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
        database.save('Category', this.transfer_data());
    }

    read () {
        return database.read('Category', this.id);
    }

    readAll () {
        return database.readAll("Category");
    }

    async update () {
        if (this.title) await database.update('Category', 'title', this.title, this.id);
        if (this.description) await database.update('Category', 'description', this.description, this.id);
    }

    async delete () {
        await database.delete('Category', this.id);
    }


}

