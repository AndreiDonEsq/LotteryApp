import TicketController from "./controllers/ticket.controller";

const express = require('express');

export const TicketRouter = express.Router();

TicketRouter.route(`/readTickets`).get(TicketController.readTickets);
TicketRouter.route(`/saveTicketData`).post(TicketController.saveTicketData);