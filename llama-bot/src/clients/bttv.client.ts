import { EmoteDTO } from "../api/models/emote.dto";
import { BTTVEmotesRes, BTTVTopEmote } from "./models/bttv/bttv-emotes.model";
import { TTVEmotesRes } from "./models/twitch-emotes/twitch-emotes.model";

export class BetterTwitchTVClient {
  private static readonly EMOTES_URL_TEMPLATE =
    "//cdn.betterttv.net/emote/{{id}}/{{image}}.gif";

  static async getBTTVEmotesFromChannels(channel: string): Promise<EmoteDTO[]> {
    const fetchedEmotesRes = await fetch(
      `https://api.betterttv.net/2/channels/${channel}?limit=100`
    );
    const fetchedEmotes = (
      (await fetchedEmotesRes.json()) as {
        emotes: TTVEmotesRes[];
      }
    ).emotes;
    if (fetchedEmotes) {
      return fetchedEmotes.map(({ id, code }) => ({
        code,
        url: this.getEmoteUrl(id),
      }));
    }
    return [];
  }

  static async getBTTVDefaultEmotes(): Promise<EmoteDTO[]> {
    const fetchedEmotesRes = await fetch(
      `https://api.betterttv.net/2/emotes?limit=100`
    );
    const fetchedEmotes = ((await fetchedEmotesRes.json()) as BTTVEmotesRes)
      .emotes;
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
    const fetchedEmotesRes = await fetch(
      `https://api.betterttv.net/3/emotes/shared/top?offset=${offset}&limit=100`
    );
    const fetchedEmotes = (await fetchedEmotesRes.json()) as BTTVTopEmote[];
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
