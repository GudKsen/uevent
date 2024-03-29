import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { Database } from "../../database/Database.js";

let database = new Database();

export class Ticket
{
    constructor (event_id, user_id, price, purchase_date, seat, visit_date)
    {
        this.event_id = event_id;
        this.user_id = user_id;
        this.price = price;
        this.purchase_date = purchase_date;
        this.seat = seat;
        this.visit_date = visit_date;
    }

    init(id) {
        this.id = id;
    }

    transfer_data() {
        let obj = {
          Event_ID: this.id,
          User_ID: this.user_id,
          price: this.price,
          purchase_date: this.purchase_date,
          seat: this.seat,
          visit_date: this.visit_date
        };
        return obj;
    }

    create () {
        database.save('Ticket', this.transfer_data());
    }

    async read () {
        return await database.read('Ticket', this.id);
    }

    async readAll () {
        let databaseGet = new DatabaseGet();
        return await databaseGet.get_tickets_by_user_id(this.user_id);
    }

    async update () {
        // if (this.title) await database.update('Format', 'title', this.title, this.id);
        // if (this.description) await database.update('Format', 'description', this.description, this.id);
        throw new Error('Not implemented');
    }

    async delete () {
        await database.delete('Ticket', this.id);
    }
}