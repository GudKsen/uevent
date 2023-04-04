import { Ticket } from "../../entities/Ticket/Ticket.js";

export const BuyTicket = (req, res) =>
{
    let event_id = parseInt(req.params.id);
    let user_id = req.user._id;
    let price = req.body.price;
    let purchase_date = Date.now();
    let seat = req.body.seat;
    let visit_date = req.body.visit_date;

    let ticket = new Ticket(event_id, user_id, price, purchase_date, seat, visit_date);
    ticket.create();
    res.json("created");
}

export const GetTicket = async (req, res) =>
{
    let id = parseInt(req.params.id);
    let ticket = new Ticket();
    ticket.init(id);
    let data = await ticket.read();
    res.json(data);
}

export const GetTickets = async (req, res) =>
{
    let ticket =  new Ticket(user_id = req.user._id);
    let data = await ticket.readAll();
    res.json(data);
}

export const DeleteTickets = (req, res) =>
{
    let id = parseInt(req.params.id);
}