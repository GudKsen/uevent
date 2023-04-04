import { pool } from "../connectDB.js";

export class DatabaseDelete
{
    delete_event_theme(Event_ID)
    {
        let command =  `delete from Event_Theme where Event_ID = "${Event_ID}"`;
        pool.query(command);
    }
}