import { pool } from "../connectDB.js";

export class DatabaseGet
{
    async get_events_with_themes()
    {
        let command = `select Event.*, Theme.* from Event_Theme join Event on Event.Event_ID = Event_Theme.Event_ID join Theme on Theme.Theme_ID = Event_Theme.Theme_ID`;
        const events = await pool.promise().query(command);
        if (events[0].length)
        {
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
}


//const events = await pool.query("SELECT * FROM events WHERE theme_id IS NOT NULL");
//return events.rows;