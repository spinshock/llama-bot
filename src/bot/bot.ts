import * as Discord from "discord.js";
import { BetterTwitchTVClient } from "../bttv-emotes/bttv.client";
import { TwitchEmotesClient } from "../twitch-emotes/twitch-emotes.client";
import { TTVClient } from "../twitch/ttv.client";
import emotesRepo from "../database/repositories/emotes.repository";
import { getEmoteEmbed } from "./emote-embed";

let ttv_client_id;
let ttv_client_secret;
if (process.env.ttv_client_id && process.env.ttv_client_secret) {
  ttv_client_id = process.env.ttv_client_id;
  ttv_client_secret = process.env.ttv_client_secret;
}

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
    } catch (err) {
      msg.reply(err.toString());
    }
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
      // if (!emoteUrl) {
      //   emoteUrl = await (
      //     await twitchEmotesClient.getTwitchEmoteFromCode(emoteCode)
      //   ).url;
      // }
      console.log(emoteCode, emoteUrl);

      const savedEmote = await emotesRepo.addEmote(emoteCode, emoteUrl);
      if (savedEmote) {
        msg.edit(`Added emote: ${savedEmote.code} EDIT`);
        console.log(savedEmote);

        msg.channel.send(`Added emote: ${savedEmote.code}`, {
          files: [savedEmote.url],
        });
      } else {
        msg.channel.send(`Couldn't add emote: ${savedEmote.code}`, {
          files: [savedEmote.url],
        });
      }
    } catch (err) {
      msg.reply(err.toString());
    }
  }
});

export const startDiscordBot = () => {
  discordClient.login(process.env.discord_token);
  console.log("Discord bot started.");

  return discordClient;
};
