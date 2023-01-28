import express from 'express';
import multer from "multer";

import auth from "../middlewares/verifyToken.js";

import { multerFilter, multerStorage } from "../utils/Media/multerFunc.js";

import {
    CreateEvent, 
    GetEvent, 
    GetEvents, 
    UpdateEvent, 
    DeleteEvent,
    GetCommentsEvent
} from "../controllers/Event/EventController.js"


const router = express.Router();

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
  

router.post("/api/event", upload.single("file"), CreateEvent);

router.get("/api/event/:id([0-9]+)",    GetEvent);

router.get("/api/events",   GetEvents);

router.patch("/api/event/:id([0-9]+)",   UpdateEvent);

router.delete("/api/event/:id([0-9]+)",   DeleteEvent);

router.get("/api/event/:id/comments", GetCommentsEvent);


export default router;

