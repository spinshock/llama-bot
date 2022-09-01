import { Awaitable, Events, Message } from "discord.js";
import emotesRepo from "../database/emotes.repo";
import { BaseListener } from "./listener";

export class EmoteListener extends BaseListener<Events.MessageCreate> {
  constructor() {
    super(Events.MessageCreate);
  }

  handler(message: Message): Awaitable<void> {
    if (message.author.bot) return;
    console.log(message.content);

    const foundEmote = emotesRepo.getEmote(message.content);
    if (foundEmote) {
      message.channel.send(foundEmote.url);
    }
  }
}
