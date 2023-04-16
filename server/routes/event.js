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
    GetCommentsEvent,
    GetEventsByCountry,
    GetEventsByCompanyId,
    BuyTicket
} from "../controllers/Event/EventController.js"


const router = express.Router();

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
  

router.post("/api/event", auth, upload.single("file"), CreateEvent);

router.get("/api/event/:id([0-9]+)",    GetEvent);

router.get("/api/events", GetEventsByCountry);

router.get("/api/events/:id([0-9]+)", GetEventsByCompanyId);

router.get("/api/events/all", GetEvents);

router.patch("/api/event/:id([0-9]+)",   UpdateEvent);

router.delete("/api/event/:id([0-9]+)",   DeleteEvent);

router.get("/api/event/:id/comments", GetCommentsEvent);

router.post("/api/event/:id/buy", BuyTicket);


export default router;

