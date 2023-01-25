import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    CreateEvent, 
    GetEvent, 
    GetEvents, 
    UpdateEvent, 
    DeleteEvent,
    GetCommentsEvent
} from "../controllers/Event/EventController.js"


const router = express.Router();

router.post("/api/event", CreateEvent);

router.get("/api/event/:id([0-9]+)", auth,  GetEvent);

router.get("/api/events", auth, GetEvents);

router.patch("/api/event/:id([0-9]+)", auth, UpdateEvent);

router.delete("/api/event/:id([0-9]+)", auth, DeleteEvent);

router.get("/api/event/:id/comments", GetCommentsEvent);


export default router;

