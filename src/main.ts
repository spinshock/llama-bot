import "reflect-metadata";
import { startApi } from "./api/api";
import { startDiscordBot } from "./bot/bot";
import { startDb } from "./database/db";

startDb()
  .then(() => {
    startDiscordBot();
  })
  .then(() => {
    startApi();
  });
