import createBot from "./bot";
import { BetterTwitchTVClient } from "./clients/bttv.client";
import twitchTvClient, { initTwitchTvClient } from "./clients/twitch-tv.client";
import { initConfig } from "./config";
import emotesRepo from "./database/emotes.repo";
import ALL_LISTENERS from "./listeners/index";

initConfig();
initTwitchTvClient().then(() => {
  twitchTvClient
    .getTwitchEmotesFromChannels(["forsen"])
    .then((emotes) => emotesRepo.addEmotes(...emotes));
});

BetterTwitchTVClient.getBTTVTopEmotes(25).then((emotes) =>
  emotesRepo.addEmotes(
    ...emotes.map((emote) => ({ ...emote, url: emote.url || "" }))
  )
);

const llamaBot = createBot(process.env.DISCORD_TOKEN as string);
llamaBot.registerListeners(...ALL_LISTENERS);
llamaBot.start();

const exit = (code = 0) => {
  console.log("Gracefully exiting...");

  llamaBot.destroy();
  process.exit(code);
};

process.once("SIGTERM", () => exit());
process.once("SIGINT", () => exit());
