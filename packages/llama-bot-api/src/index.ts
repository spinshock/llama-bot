import dotenv from "dotenv";
import express, { Application } from "express";
import { initializeDatabase } from "./database/db";
import Router from "./routes";
dotenv.config();

const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(express.json());

app.use("/api", Router);

export const startApi = () => {
  initializeDatabase();
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });

  return app;
};

startApi();
