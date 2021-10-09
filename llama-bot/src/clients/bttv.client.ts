import axios from "axios";
import { Emote } from "../models/emote";
import { BTTVEmotesRes, BTTVTopEmote } from "../models/bttv/bttv-emotes.model";
import { TTVEmotesRes } from "../models/twitch-emotes/twitch-emotes.model";

export class BetterTwitchTVClient {
  private static readonly EMOTES_URL_TEMPLATE =
    "//cdn.betterttv.net/emote/{{id}}/{{image}}.gif";

  static async getBTTVEmotesFromChannels(channel: string): Promise<Emote[]> {
    const fetchedEmotesRes = await axios.get<{
      emotes: TTVEmotesRes[];
    }>(`https://api.betterttv.net/2/channels/${channel}?limit=100`);
    const fetchedEmotes = fetchedEmotesRes.data.emotes;
    if (fetchedEmotes) {
      return fetchedEmotes.map(({ id, code }) => ({
        code,
        url: this.getEmoteUrl(id),
      }));
    }
    return [];
  }

  static async getBTTVDefaultEmotes(): Promise<Emote[]> {
    const fetchedEmotesRes = await axios.get<BTTVEmotesRes>(
      `https://api.betterttv.net/2/emotes?limit=100`
    );
    const fetchedEmotes = fetchedEmotesRes.data.emotes;
    if (fetchedEmotes) {
      return fetchedEmotes.map(({ id, code }) => ({
        code,
        url: this.getEmoteUrl(id),
      }));
    }
    return [];
  }

  static async getBTTVTopEmotes(
    maxOffset: number,
    offset = 0,
    emotes: { id: string; code: string }[] = []
  ): Promise<any> {
    const fetchedEmotesRes = await axios.get<BTTVTopEmote[]>(
      `https://api.betterttv.net/3/emotes/shared/top?offset=${offset}&limit=100`
    );
    const fetchedEmotes = fetchedEmotesRes.data;
    const mappedEmotes = fetchedEmotes.map((emote) => emote.emote);

    if (offset <= maxOffset && fetchedEmotes.length) {
      return this.getBTTVTopEmotes(maxOffset, offset + 100, [
        ...emotes,
        ...mappedEmotes,
      ]);
    } else {
      return [...emotes, ...mappedEmotes].map(({ id, code }) => ({
        code,
        url: this.getEmoteUrl(id),
      }));
    }
  }

  private static getEmoteUrl(
    id: string,
    size: "1x" | "2x" | "3x" = "3x"
  ): string {
    return `https:${this.EMOTES_URL_TEMPLATE.replace("{{id}}", id).replace(
      "{{image}}",
      size
    )}`;
  }
}
