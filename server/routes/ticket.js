import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    BuyTicket,
    GetTicket,
    GetTickets,
    // UpdateTicket,
    DeleteTicket,
    GetFreeTicket
} from "../controllers/Ticket/Ticket.js";

const router = express.Router();

router.post("/api/ticket", auth, BuyTicket);
router.post("/api/event/ticket/free/:id([0-9]+)", auth, GetFreeTicket);
router.get("/api/ticket/:id", GetTicket);
router.get("/api/tickets", GetTickets);                        
// router.patch("/api/ticket/:id", auth, UpdateTicket);
router.delete("/api/ticket/:id", auth, DeleteTicket);

export default router;