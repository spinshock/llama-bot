import "reflect-metadata";
import express, { Application } from "express";
import Router from "./routes";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(express.static("public"));

app.use(Router);

export const startApi = () => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });

  return app;
};
