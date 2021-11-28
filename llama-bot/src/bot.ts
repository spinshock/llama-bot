import Discord, { Intents } from "discord.js";
import { BetterTwitchTVClient } from "./clients/bttv.client";
import { TwitchEmotesClient } from "./clients/twitch-emotes.client";
import { TTVClient } from "./clients/ttv.client";

const TTV_CLIENT_ID = process.env.TTV_CLIENT_ID;
const TTV_CLIENT_SECRET = process.env.TTV_CLIENT_SECRET;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

if (!TTV_CLIENT_ID || !TTV_CLIENT_SECRET) {
  throw Error("No ttv credentials provided");
}

const ttvClient = new TTVClient(TTV_CLIENT_ID, TTV_CLIENT_SECRET);

const twitchEmotesClient = new TwitchEmotesClient(ttvClient);

twitchEmotesClient.getTwitchEmotesFromChannels([""]);

BetterTwitchTVClient.getBTTVTopEmotes(25);

const discordClient = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
  presence: {
    status: "online",
    activities: [
      {
        name: "https://llama-bot-discord.herokuapp.com/",
      },
    ],
  },
});

discordClient.on("message", (msg) => {
  if (msg.author.bot) {
    return;
  }
  const insults = [
    { user: "gesha", insult: "gheshae A gei" },
    { user: "georgi", insult: "georgi A gei" },
    { user: "sasho", insult: "Sasho koga she seie namaereesh raabottaa ?" },
    { user: "stefcho", insult: "Stefcho A pleshiv" },
    { user: "dani", insult: "Dani a sveenia" },
    { user: "viki", insult: "Marineeeeeeeeee" },
    { user: "ico", insult: "EEtsoooooo, mimoono gruozna" },
    { user: "hristofar", insult: "hristofare jivotnoooooooooooooo" },
    { user: "icara", insult: "sasukeeeeeeeeeeeeeeeeeeeeee" },
    { user: "yavor mentora", insult: "narutoooooooooooooo" },
    { user: "yavor", insult: "yavorcho edno bakshishche ?" },
    { user: "qvore", insult: "yavore dai edin bakshish" },
    { user: "qvor", insult: "yavor, edno bakshishche ?" },
    { user: "plamen", insult: "Plamen neee A maloumen toi e programist" },
    { user: "paco", insult: "Patso da iade naa sasho huia" },
    { user: "ivan", insult: "Ivane, ko ta ibe ve brat" },
    { user: "ivane", insult: "Ivane neponosim si" },
    { user: "facebook", insult: "facebook A laino" },
  ];
  const foundInsults = insults.filter((user) =>
    msg.content.toLowerCase().includes(user.user)
  );
  if (foundInsults.length) {
    foundInsults.forEach((insult) => {
      msg.channel.send({ tts: true, content: insult.insult });
    });
  }
});

discordClient.on("ready", () => {
  console.log("Discord bot ready.");
});

export const startDiscordBot = (): void => {
  if (!DISCORD_TOKEN) {
    throw Error("No discord token provided.");
  }
  discordClient.login(DISCORD_TOKEN);
  console.log("Discord bot started.");
};

startDiscordBot();
