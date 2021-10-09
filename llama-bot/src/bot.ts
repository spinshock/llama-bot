import Discord, { Intents } from "discord.js";
import { BetterTwitchTVClient } from "./clients/bttv.client";
import { TwitchEmotesClient } from "./clients/twitch-emotes.client";
import { TTVClient } from "./clients/ttv.client";

let ttv_client_id = process.env.TTV_CLIENT_ID;
let ttv_client_secret = process.env.TTV_CLIENT_SECRET;

if (!ttv_client_id || !ttv_client_secret) {
  throw Error("No ttv credentials provided");
}

const ttvClient = new TTVClient(ttv_client_id, ttv_client_secret);

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
        name: "https://ttv-discord-bot.herokuapp.com/",
        type: "CUSTOM",
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

export const startDiscordBot = () => {
  if (!process.env.discord_token) {
    throw Error("No discord token provided");
  }
  discordClient.login(process.env.discord_token);
  console.log("Discord bot started.");

  return discordClient;
};

startDiscordBot();
