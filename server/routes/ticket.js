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
router.get("/api/tickets", GetTickets);
router.patch("/api/ticket/:id", auth, UpdateTicket);
router.delete("/api/ticket/:id", DeleteTicket);

export default router;