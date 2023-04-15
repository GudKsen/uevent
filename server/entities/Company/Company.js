import { Database } from "../../database/DB_Functions/Database.js"
let database = new Database();


export class Company
{
    constructor (name, description, email, location, image) {
        this.name = name;
        this.description = description;
        this.email = email;
        this.location = location;
        this.image = image;
    }

    init(id) {
        this.id = id;
    }

    transfer_data() {
        let obj = {
          name: this.name,
          description: this.description,
          email: this.email,
          Location_ID: this.location,
          image: this.image
        };
        return obj;
    }

    async create (owner) {
        let id = await database.save('Company', this.transfer_data());
        database.save('Organizer_Company', {User_ID: owner, Company_ID: id})
    }

    read () {
        return database.read('Company', this.id);
    }

    readAll () {
        return database.readAll("Company");
    }

    async update () {
        if (this.name) await database.update('Company', 'name', this.name, this.id);
        if (this.description) await database.update('Company', 'description', this.description, this.id);
        if (this.email) await database.update('Company', 'email', this.email, this.id);
        if (this.image) await database.update('Company', 'image', this.image, this.id);
    }

    async delete () {
        let d = await this.read();
        await database.delete('Location', d[0].Location_ID);
        await database.delete('Company', this.id);
    }
}

