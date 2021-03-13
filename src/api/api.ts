import "reflect-metadata";
import express, { Application } from "express";
import Router from "./routes";
import path from "path";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.use("/api", Router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

export const startApi = () => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });

  return app;
};
