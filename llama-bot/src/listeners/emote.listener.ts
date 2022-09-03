import { Events, Message } from "discord.js";
import { Op } from "sequelize";
import Emote from "../database/models/emote.model";
import { BaseListener } from "./listener";

export class EmoteListener extends BaseListener<Events.MessageCreate> {
  constructor() {
    super(Events.MessageCreate);
  }

  async handler(message: Message): Promise<void> {
    if (message.author.bot) return;

    const foundEmote = await Emote.findOne({
      where: { code: { [Op.eq]: message.content } },
    });
    if (foundEmote) {
      await message.channel.send(foundEmote.getDataValue("url"));
      foundEmote.count += 1;
      foundEmote.save();
    }
  }
}
