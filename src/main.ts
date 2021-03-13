import "reflect-metadata";
import dotenv from "dotenv";
import { startApi } from "./api/api";
import { startDiscordBot } from "./bot/bot";
import { startDb } from "./database/db";

dotenv.config();

startDb()
  .then(() => {
    startDiscordBot();
  })
  .then(() => {
    startApi();
  });
