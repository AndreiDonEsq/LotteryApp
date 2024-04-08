import { DataTypes } from "sequelize";
import { sequelize } from "../db.config";

export const Ticket = sequelize.define('Ticket', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    superzahl: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        timestamps: false
    }
);