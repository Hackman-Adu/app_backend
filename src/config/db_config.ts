import { SequelizeOptions } from "sequelize-typescript";

import dotenv from "dotenv";
import { dbTables } from "./db_tables";

dotenv.config();

export const dbConfig: SequelizeOptions = {
  database: process.env.DATABASE,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER_PASSWORD,
  models: dbTables,
  dialect: "mysql",
  host: process.env.DATASBE_HOST,
  port: parseInt(process.env.CONNECTION_PORT ?? "3306"),
};
