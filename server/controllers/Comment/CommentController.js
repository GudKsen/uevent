import { Comment } from "../../entities/Comment/Comment.js";

import { DatabaseFind } from "../../database/DB_Functions/DatabaseFind.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { Event } from "../../entities/Event/Event.js";
// import { GetComment as GetCommentClass} from "../../entities/Event/GetEvents.js";
import { GetComment as GetCommentClass } from "../../entities/Comment/GetComment.js";
import { Location } from "../../entities/Location/Location.js";
import { User } from "../../entities/User/User.js";

export const SaveComment = (req, res) => {
    let content = req.body.content;
    let date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let user_id = req.user._id;
    let id = req.body.id;
    console.log(content, id);

    let comment = new Comment(content, date, user_id, id);
    console.log(comment);
    comment.save();
    console.log("vse ok");
    res.json(comment);
}

export const DeleteComment = (req, res) => {
    let id = parseInt(req.params.id);
    console.log("==========================\n"+id+"------------------------------\n")
    let comment = new Comment();
    comment.init(id);
    comment.delete();
    res.json("deleted");
}

export const GetComment = async (req, res) => {
    let id = parseInt(req.params.id);
    let comment = new Comment();
    comment.init(id);
    let c = await comment.read();
    res.json(c);
}

export const GetCommentsByEventId = async (req, res) => {
    let id = parseInt(req.params.id);
    let comment = new GetCommentClass();

    let data = await comment.GetCommentByEventId(id);
    
    if (data === null)
    {
      return res.json([]);
    }

    data.sort(function (a, b) {
      if (a.date < b.date)
      {
       return -1;
      } 
      else if (a.date > b.date)
      {
       return 1;
      }
      else 
      {
       return 0;
      }
     })
    return res.json(data);

    // comment.init(id);
    // let c = await comment.read();
    // res.json(c);
}

export const UpdateComment = (req, res) => {

}