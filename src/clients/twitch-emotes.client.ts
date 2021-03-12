import { EmoteDTO } from "../api/models/emote.dto";
import { TTVClient } from "./ttv.client";

export class TwitchEmotesClient {
  constructor(private readonly ttvClient: TTVClient) {}

  getTwitchEmotesFromChannels(channels: string[]): Promise<EmoteDTO[]> {
    return this.ttvClient.getChannelId(...channels).then((ids) => {
      return this.ttvClient.getEmotesForChannelIds(ids);
    });
  }

  getTwitchEmoteFromCode(code: string): Promise<EmoteDTO> {
    return;
  }
}
