import { pool } from "../connectDB.js";

export class DatabaseGet
{
    async get_events_with_themes()
    {
        let command = `select Event.*, Theme.* from Event_Theme join Event on Event.Event_ID = Event_Theme.Event_ID join Theme on Theme.Theme_ID = Event_Theme.Theme_ID`;
        let get_events_command = `select * from Event`;
        
        
        const events = await pool.promise().query(get_events_command);
        if (events[0].length)
        {
            for (let event of events[0])
            {
                let event_id = event.Event_ID;
                let command_get_themes_event = `select Theme.* from Event_Theme
                inner join Theme on Event_Theme.Theme_ID = Theme.Theme_ID
                where Event_Theme.Event_ID = ${event_id}`;
                let themes = await pool.promise().query(command_get_themes_event);
                if (themes.length)
                {
                   event.themes = themes[0];
                }
            }
            // console.log(events[0]);
            return events[0];
        }
        else 
        {
            return null;
        }
    }

    async get_events_with_themes_by_event_id(event_id)
    {
        // let command = `select Event.*, Theme.* from Event_Theme 
        // inner join Event on Event.Event_ID = Event_Theme.Event_ID 
        // inner join Theme on Theme.Theme_ID = Event_Theme.Theme_ID 
        // where Event.Event_ID = ${event_id}`;

        let command_get_event = `select * from Event where Event.Event_ID = ${event_id}`;
        let command_get_themes_event = `select Theme.* from Event_Theme
        inner join Theme on Event_Theme.Theme_ID = Theme.Theme_ID
        where Event_Theme.Event_ID = ${event_id}`;

        let events = await pool.promise().query(command_get_event);
        const thmemes = await pool.promise().query(command_get_themes_event);

        if (events[0].length)
        {
            if (thmemes[0].length)
            {
                events[0][0].themes = thmemes[0];
                return events[0];
            }
            else 
            {
                return events[0];
            }
        }
        else 
        {
            return null;
        }

        // if (events[0].length)
        // {
        //     return events[0];
        // }
        // else 
        // {
        //     return null;
        // }
    }

    async get_organizator_with_company()
    {
        let get_organizator_command = `select * from User where role = 'organizator`;
        let organizators = await pool.promise().query(get_organizator_command);
        if (organizators[0].length)
        {
            for (let organizator in organizators)
            {
                let id = organizator.User_ID;
                let command_get_organizator_company = `select Company.* from Organizator_Company
                inner join Company on Organizator_Company.Company_ID = Company.Company_ID
                where Organizator_Company.User_ID = ${id}`;
                let companies = await pool.promise().query(command_get_organizator_company);
                if (companies[0].length)
                {
                    organizator.company = companies[0];
                } 
            }  
            return organizators[0];
        }
        else
        {
            return null;
        }
    }

    async get_events_by_location(location)
    {
        // location = "Ukraine,Kyiv,st This,75" - EVENT
        // location = "Ukraine,Kyiv" - USER
        // can't parse address
        // 
        let command = `select * from Event where location like '%${location}%'`;
        let data = await pool.promise().query(command_get_events_by_location);
        if (data[0].length)
        {
            return data[0];
        }
        else 
        {
            return null;
        }
    }
}




//const events = await pool.query("SELECT * FROM events WHERE theme_id IS NOT NULL");
//return events.rows;