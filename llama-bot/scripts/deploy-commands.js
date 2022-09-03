/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { DISCORD_TOKEN, APPLICATION_ID } = require("dotenv").config().parsed;

const commands = [
  new SlashCommandBuilder()
    .setName("addemote")
    .setDescription("Add a new emote!")
    .addStringOption((option) =>
      option.setName("code").setDescription("The emote code").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("url").setDescription("The emote url").setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(APPLICATION_ID), { body: commands })
  .then((data) =>
    console.log(`Successfully registered ${data.length} application commands.`)
  )
  .catch(console.error);
