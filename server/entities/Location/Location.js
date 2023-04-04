import { Database } from "../../database/DB_Functions/Database.js";

let database = new Database();

export class Location
{
    constructor (street_number, address_line_street, address_line_2, city, country) 
    {
        this.street_number = street_number;
        this.address_line_street = address_line_street;
        this.address_line_state = address_line_2;
        this.city = city
        this.country = country;
    }

    init(id) {
        this.id = id;
    }

    transfer_data() {
        let obj = {
          street_number: this.street_number,
          address_line_street: this.address_line_street,
          address_line_state: this.address_line_state,
          city: this.city,
          country: this.country
        };
        return obj;
    }

    async create () {
        let id = await database.save('Location', this.transfer_data());
        return id;
    }

    read () {
        return database.read('Location', this.id);
    }

    readAll () {
        return database.readAll("Location");
    }

    async update () {
        if (this.name) await database.update('Location', 'name', this.name, this.id);
        if (this.street_number) await database.update('Location', 'street_number', this.street_number, this.id);
        if (this.address_line_street) await database.update('Location', 'address_line_street', this.address_line_street, this.id);
        if (this.address_line_2) await database.update('Location', 'address_line_2', this.address_line_2, this.id);
        if (this.city) await database.update('Location', 'city', this.city, this.id);
        if (this.country) await database.update('Location', 'country', this.country, this.id);
    }

    async delete () {
        await database.delete('Location', this.id);
    }
}