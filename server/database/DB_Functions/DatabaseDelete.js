import { pool } from "../connectDB.js";

export class DatabaseDelete
{
    delete_by_eventId(table, Event_ID)
    {
        let command =  `delete from ${table} where Event_ID = "${Event_ID}"`;
        pool.query(command);
    }

    delete_by_userId(table, User_ID)
    {
        let command =  `delete from ${table} where User_ID = "${User_ID}"`;
        pool.query(command);
    }
}