import { ChatInputCommandInteraction } from "discord.js";
import validator from "validator";
import Emote from "../database/models/emote.model";
import { Command } from "./command";

export const AddEmoteCommand: Command = {
  commandName: "addemote",
  handler: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    const code = interaction.options.get("code");
    const foundEmote = await Emote.findOne({ where: { code } });
    if (foundEmote) {
      interaction.reply("Emote with this code already exists");
      return;
    }
    const url = interaction.options.get("url")?.value;
    if (url && typeof url === "string" && !validator.isURL(url)) {
      interaction.reply("Invalid URL");
      return;
    }
    await Emote.create({ code, url });
    interaction.reply("Emote added!");
  },
};
