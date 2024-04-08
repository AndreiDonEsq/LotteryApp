import { Request, Response } from "express";
import { Box, Ticket } from "../schemas/index.schema";

export default class TicketController {
    public static async readTickets(req: Request, res: Response): Promise<void> {
        const tickets = await Ticket.findAll({
            include: [
                {
                    model: Box,
                    as: "boxes",
                },
            ]
        });

        const ticketsWithBoxes = tickets.map(ticket=> ticket.get({plain: true}));
        res.send(ticketsWithBoxes);
    }

    public static async saveTicketData(req: Request, res: Response): Promise<void> {
        const body = req.body as unknown as { boxSelectedNumbers: string[], superzahl: number };
        if (!body) {
            throw new Error("Missing request body!")
        }

        const superzahl: number = body.superzahl;

        try {
            const newTicket = await Ticket.create({
                superzahl: superzahl
            });

            const ticketUuid: string = newTicket.dataValues.uuid;
            const createBoxes = body.boxSelectedNumbers.map(selectedNumber => {
                Box.create({
                    selectedNumbers: selectedNumber,
                    ticketUuid: ticketUuid
                })
            });
            await Promise.all(createBoxes);

            res.status(201).send({ message: "Tickets created successfully" });
        } catch (error) {
            console.error("Error creating tickets:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
}