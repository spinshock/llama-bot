import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import Router from "./routes";
import { startDb } from "./database/db";

const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(express.json());

app.use("/api", Router);

export const startApi = () => {
  startDb().then((dbConnection) => {
    console.log(dbConnection.isConnected);
  });
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });

  return app;
};

startApi();
