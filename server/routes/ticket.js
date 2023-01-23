import express from 'express';

import auth from "../middlewares/verifyToken.js";

import {
    CreateTicket,
    GetTicket,
    GetTickets,
    UpdateTicket,
    DeleteTicket
} from "../controllers/Ticket/TicketController.js";

const router = express.Router();

router.post("/api/ticket", auth, CreateTicket);
router.get("/api/ticket/:id", GetTicket);
router.get("/api/tickets", GetTickets);                        // it can be not usefull
router.patch("/api/ticket/:id", auth, UpdateTicket);
router.delete("/api/ticket/:id", auth, DeleteTicket);

export default router;