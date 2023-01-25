import { ChatInputCommandInteraction } from "discord.js";
import { AddEmoteCommand } from "./add-emote.command";

export enum CommandName {
  ADD_EMOTE = "addemote",
}

export const ALL_COMMANDS = {
  [CommandName.ADD_EMOTE]: AddEmoteCommand,
};

export type Command = {
  commandName: string;
  handler: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export type CommandMap = {
  [key: string]: Command;
};
