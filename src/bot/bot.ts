import * as Discord from "discord.js";
import { BetterTwitchTVClient } from "../clients/bttv.client";
import { TwitchEmotesClient } from "../clients/twitch-emotes.client";
import { TTVClient } from "../clients/ttv.client";
import emotesRepo from "../database/repositories/emotes.repository";

let ttv_client_id = process.env.ttv_client_id;
let ttv_client_secret = process.env.ttv_client_secret;

const ttvClient = new TTVClient(ttv_client_id, ttv_client_secret);

const twitchEmotesClient = new TwitchEmotesClient(ttvClient);

const bttvClient = new BetterTwitchTVClient();

const discordClient = new Discord.Client();

discordClient.on("message", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  try {
    const emote = await emotesRepo.getEmoteByCode(msg.content);
    if (emote && emote.url) {
      msg.channel.send(emote.url);
    }
  } catch (err) {
    msg.reply(err.toString());
  }
});

discordClient.on("message", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content.startsWith("-e add-channel ")) {
    try {
      const channel = msg.content.slice(15);
      console.log(channel);
      const emotesFromChannel = await twitchEmotesClient.getTwitchEmotesFromChannels(
        [channel]
      );

      const savedEmotes = await emotesRepo.addEmotes(emotesFromChannel);
      savedEmotes.forEach((emote) => {
        const embed = new Discord.MessageEmbed().setThumbnail(emote.url);
        msg.reply(`Added emote: ${emote.code}`, { embed });
      });
      msg.reply(`All emotes for channel ${channel} have been added.`);
    } catch (err) {
      msg.reply(err.toString());
    }
  }
});

discordClient.on("message", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content === "georgi") {
    msg.channel.send("= gei");
  }
  if (msg.content === "georgi e gei") {
    msg.channel.send("da");
  }
});

discordClient.on("message", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (
    msg.content.startsWith("-h") ||
    msg.content.startsWith("-help") ||
    msg.content.startsWith("-e help")
  ) {
    try {
      msg.reply(
        `https://ttv-discord-bot.herokuapp.com/\n
        Commands: \n
        \`-e add-channel {twitch_channel_name}\` \n
        \`-e add-emote {emote_name_no_space} {url_to_emote_image}\` \n
        \`-e remove-emote {emote_name}\``
      );
    } catch (err) {
      msg.reply(err.toString());
    }
  }
});

discordClient.on("message", (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.mentions.users.filter((u) => u.id === discordClient.user.id).size) {
    msg.reply("https://ttv-discord-bot.herokuapp.com/");
  }
});

discordClient.on("message", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content.startsWith("-e add-emote ")) {
    try {
      const emoteToAdd = msg.content.slice(13);
      let [emoteCode, emoteUrl] = emoteToAdd.split(" ");

      const savedEmote = await emotesRepo.addEmote(emoteCode, emoteUrl);
      if (savedEmote) {
        msg.channel.send(`Added emote: ${savedEmote.code}`, {
          files: [savedEmote.url],
        });
      } else {
        msg.channel.send(`Couldn't add emote: ${emoteCode}`);
      }
    } catch (err) {
      msg.reply(err.toString());
    }
  }
});

discordClient.on("message", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.content.startsWith("-e remove-emote ")) {
    try {
      const emoteToRemove = msg.content.slice(16);

      const removedEmote = await emotesRepo.removeEmote(emoteToRemove);
      if (removedEmote) {
        msg.channel.send(
          `Removed emote: ${removedEmote.code}\nSay goodbye to ${removedEmote.url}`
        );
      } else {
        msg.channel.send(`Emote not found: ${emoteToRemove}`);
      }
    } catch (err) {
      msg.reply(err.toString());
    }
  }
});

discordClient.on("ready", () => {
  discordClient.user.setPresence({
    status: "online",
    activity: {
      name: "https://ttv-discord-bot.herokuapp.com/",
      type: "CUSTOM_STATUS",
    },
  });
});

export const startDiscordBot = () => {
  let token = process.env.discord_token;
  discordClient.login(token);
  console.log("Discord bot started.");

  return discordClient;
};
