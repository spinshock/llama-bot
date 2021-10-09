import { Emote } from "../models/emote";
import { TTVClient } from "./ttv.client";

export class TwitchEmotesClient {
  constructor(private readonly ttvClient: TTVClient) {}

  getTwitchEmotesFromChannels(channels: string[]): Promise<Emote[]> {
    return this.ttvClient.getChannelId(...channels).then((ids) => {
      return this.ttvClient.getEmotesForChannelIds(ids);
    });
  }

  // getTwitchEmoteFromCode(code: string): Promise<Emote> {
  //   return;
  // }
}
