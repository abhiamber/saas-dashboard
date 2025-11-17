import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import { initializeModels } from "../models";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    port: Number(process.env.DB_PORT ?? 3306),
  }
);

export const connectDB = async () => {
  try {
    initializeModels(sequelize)
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });

    console.log("MySQL connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};
