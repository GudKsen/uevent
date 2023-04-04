import { Comment } from "../../entities/Comment/Comment.js";

export const SaveComment = (req, res) => {
    let content = req.body.content;
    let date = new Date.now();
    let user_id = req.user._id;
    let id = parseInt(req.params.id);

    let comment = new Comment(content, date, user_id, id);
    comment.save();
    res.json(comment);
}

export const DeleteComment = (req, res) => {
    let id = parseInt(req.params.id);
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

export const UpdateComment = (req, res) => {

}