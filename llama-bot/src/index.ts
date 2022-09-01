import "reflect-metadata";
import { LlamaBot } from "./bot";
import { BetterTwitchTVClient } from "./clients/bttv.client";
import { TTVClient } from "./clients/ttv.client";
import { TwitchEmotesClient } from "./clients/twitch-emotes.client";
require("dotenv").config();

const TTV_CLIENT_ID = process.env.TTV_CLIENT_ID;
const TTV_CLIENT_SECRET = process.env.TTV_CLIENT_SECRET;

if (!TTV_CLIENT_ID || !TTV_CLIENT_SECRET) {
  throw Error("No ttv credentials provided");
}

const ttvClient = new TTVClient(TTV_CLIENT_ID, TTV_CLIENT_SECRET);

const twitchEmotesClient = new TwitchEmotesClient(ttvClient);

twitchEmotesClient.getTwitchEmotesFromChannels([""]);

BetterTwitchTVClient.getBTTVTopEmotes(25);

const llamaBot = new LlamaBot(process.env.DISCORD_TOKEN as string);
llamaBot.start();
llamaBot.registerListeners();

const exit = (code = 0) => {
  console.log("Gracefully exiting...");

  llamaBot.destroy();
  process.exit(code);
};

process.once("SIGTERM", () => exit());
process.once("SIGINT", () => exit());
