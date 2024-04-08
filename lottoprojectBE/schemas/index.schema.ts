import { Box } from "./box.schema";
import { Ticket } from "./ticket.schema";

Box.belongsTo(Ticket, { foreignKey: 'ticketUuid', targetKey: 'uuid' });
Ticket.hasMany(Box, { foreignKey: 'ticketUuid', sourceKey: 'uuid', as: 'boxes' });
Box.sync({ alter: true });
Ticket.sync({ alter: true });


export {
    Box,
    Ticket
}