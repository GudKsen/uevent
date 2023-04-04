import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    SaveComment,
    GetComment,
    UpdateComment,
    DeleteComment
} from "../controllers/Comment/CommentController.js";

const router = express.Router();

router.post("/api/comment", auth, SaveComment);
router.get("/api/comment/:id", auth, GetComment);
router.patch("/api/comment/:id", auth, UpdateComment);
router.delete("/api/comment/:id", auth, DeleteComment);


export default router;

