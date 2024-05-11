import cors from "cors";
import express, { Application } from "express";
import DatabaseConnection from "./config/db_connection";
import BaseRoutes from "./routes/base_routes";

async function connectDb() {
  try {
    await DatabaseConnection.instance.sync({ alter: true });
    console.log(`Connection successful`);
  } catch (error) {
    console.log("Connection failed", error);
  }
}

async function startServer() {
  const app: Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use("/api/v1", BaseRoutes);
  await connectDb();
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
  });
}

startServer();
