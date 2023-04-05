import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js"
import { User } from "../User/User.js";

export class GetComment
{
    async GetCommentByEventId(id)
    {
        let db = new DatabaseGet();
        let data = await  db.get_comments_by_event_id(id);
        if (data)
        {
            return data;
        }
        
        return null;
    }
        

}