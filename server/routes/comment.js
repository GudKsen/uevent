import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    CommentCreate,
    GetComment,
    UpdateComment,
    DeleteComment
} from "../controllers/Comment/CommentController.js";

const router = express.Router();

router.post("/api/comment", auth, CommentCreate);
router.get("/api/comment/:id", auth, GetComment);
router.patch("/api/comment/:id", auth, UpdateComment);
router.delete("/api/comment/:id", auth, DeleteComment);


export default router;

