import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../db.config";

export const Box = sequelize.define('Box', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  ticketUuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  selectedNumbers: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
  {
    timestamps: false
  }
);