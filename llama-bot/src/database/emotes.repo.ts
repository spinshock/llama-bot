import { Emote } from "../models/emote";

export class EmotesRepo {
  emotes: Emote[] = [];

  addEmotes(...emotes: Emote[]): void {
    this.emotes.push(...emotes);
  }

  getEmote(emoteCode: string): Emote | undefined {
    return this.emotes.find(
      (emote) => emote.code.toLowerCase() === emoteCode.toLowerCase()
    );
  }
}

export default new EmotesRepo();
