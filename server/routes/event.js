import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    createEvent, 
    getEvent, 
    getEvents, 
    updateEvent, 
    deleteEvent
} from "../controllers/Event/eventController.js"


const router = express.Router();

router.post("/api/event", auth, createEvent);

router.get("/api/event/:id([0-9]+)", auth,  getEvent);

router.get("/api/events", auth, getEvents);

router.patch("/api/event/:id([0-9]+)", auth, updateEvent);

router.delete("/api/event/:id([0-9]+)", auth, deleteEvent);

router.get("/api/event/:id/comments", getCommentsEvent);


export default router;

