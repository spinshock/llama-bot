require("dotenv").config();
import express, { Application } from "express";
import Router from "./routes";

const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(express.json());

app.use("/api", Router);

export const startApi = () => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });

  return app;
};
