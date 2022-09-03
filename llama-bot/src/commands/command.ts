import { ChatInputCommandInteraction } from "discord.js";
import { AddEmoteCommand } from "./add-emote.command";

export const ALL_COMMANDS = {
  AddEmote: AddEmoteCommand,
};

export type Command = {
  commandName: string;
  handler: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export type CommandMap = {
  [key: string]: Command;
};

export enum CommandName {
  ADD_EMOTE = "addemote",
}
