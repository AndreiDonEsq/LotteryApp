import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('Lotto', 'postgres', 'q12wE#$R', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to the database.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });