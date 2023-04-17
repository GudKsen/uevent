import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    BuyTicket,
    GetTicket,
    GetTickets,
    // UpdateTicket,
    DeleteTicket
} from "../controllers/Ticket/Ticket.js";

const router = express.Router();

router.post("/api/ticket", BuyTicket);
router.get("/api/ticket/:id", GetTicket);
router.get("/api/tickets", GetTickets);                        
// router.patch("/api/ticket/:id", auth, UpdateTicket);
router.delete("/api/ticket/:id", auth, DeleteTicket);

export default router;