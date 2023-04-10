import { Database } from "../../database/DB_Functions/Database.js";
import { DatabaseDelete } from "../../database/DB_Functions/DatabaseDelete.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { GetCurrentExchangeRate } from "../../utils/PriceEvent/getExchangeRate.js";

let database = new Database();
let databaseGet = new DatabaseGet();

export class Event
{
    constructor(title, description, companyID, dateTime, location, image, formatID, theme, endDate, publishDate, price, currency)
    {
        this.title = title;
        this.description = description;
        this.companyID = companyID;
        this.dateTime = dateTime;
        this.location = location;
        this.image = image;
        this.formatID = formatID;
        this.theme = theme;
        this.endDate = endDate;
        this.publishDate =  publishDate;
        this.price = price;
        this.currency = currency;
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
            Company_ID: this.companyID,
            startDateTime: this.dateTime,
            Location_ID: this.location,
            poster: this.image,
            Format_ID: this.formatID,
            endDateTime: this.endDate,
            publishDate: this.publishDate
        }
        return obj;
    }


    
    async save ()
    {
        let exRate = await GetCurrentExchangeRate(this.currency);
        let idPrice = await database.save("Price", {
            price_value: this.price,
            currency: this.currency,
            exchange_rate: exRate
        });
        console.log("🚀 ~ file: Event.js:58 ~ idPrice:", idPrice)
        
        this.Price_ID = idPrice;
        let dataInput = this.transfer_data();
        dataInput.Price_ID = this.Price_ID;

        let id = await database.save("Event", dataInput);

        if (this.theme)
        {
            for (let i = 0; i < this.theme.length; i++)
            {
                let theme_obj = {
                    Theme_ID: this.theme[i],
                    Event_ID: id
                };
                database.save("Event_Theme", theme_obj);
            }
        }

        
    }

    async read() {
        //let data = await database.read("Event", this.id);
        let data = await databaseGet.get_events_with_themes_by_event_id(this.id);
        

        //console.log(data);
        
        if (data !== null) {
          this.title = data[0].title;
          this.description = data[0].description;
          this.authorID = data[0].Company_ID;
          this.dateTime = data[0].dateTime;
          this.location = data[0].location;
        //   this.categoryID = data[0].categoryID;
          this.image = data[0].image;
          this.formatID = data[0].formatID;
          this.endDate = data[0].endDateTime;
        }

        return data;
    }

    async update() {
        if (this.title) await database.update("Event", "title", this.title, this.id);
        if (this.description) await database.update("Event", "description", this.description, this.id);
        if (this.authorID) await database.update("Event", "Author_ID", this.authorID, this.id);
        if (this.dateTime) await database.update("Event", "dateTime", this.dateTime, this.id);
        if (this.location) await database.update("Event", "location", this.location, this.id);
        if (this.formatID) await database.update("Event", "formatID", this.formatID, this.id);
        if (this.endDate) await database.update("Event", "endDateTime", this.endDate, this.id);
    }

    async delete ()
    {
        let dbDelete = new DatabaseDelete();
        await dbDelete.delete_event_theme(this.id);
        await database.delete("Event", this.id);
    }

    async readAll ()
    {
        let d = await databaseGet.get_events_with_themes();
        // console.log(d);
        return d;
    }
}

