import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js"

export class GetEvents
{
    async GetEventsByCountry(country, region)
    {
        let db = new DatabaseGet();
        return await  db.get_events_by_country(country, region);
    }

    async GetEventsByCompany(companyID)
    {
        let db = new DatabaseGet();
        return await db.GetByID(companyID);
    }
}