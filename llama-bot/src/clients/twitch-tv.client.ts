import axios from "axios";
import AppConfig from "../config";
import { Emote } from "../models/emote";
import { TwitchEmotesChannelRes } from "../models/twitch-emotes/twitch-emotes.model";
import { TTVUsersResponse } from "../models/twitch/ttv-users-res.model";
interface TTVAuthRes {
  access_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}
export class TwitchTvClient {
  private accessToken!: string;

  constructor() {}

  public async getTwitchEmotesFromChannels(
    channels: string[]
  ): Promise<Emote[]> {
    return this.getChannelId(...channels).then((ids) => {
      return this.getEmotesForChannelIds(ids);
    });
  }

  private async getEmotesForChannelIds(ids: string[]): Promise<Emote[]> {
    try {
      const fetchedEmotes = ids.map(async (id) => {
        const emotesRes = await axios.get<TwitchEmotesChannelRes>(
          `https://api.twitchemotes.com/api/v4/channels/${id}`
        );
        const { emotes } = emotesRes.data;
        if (emotes && emotes.length) {
          return emotes.map(({ code, id }) => ({
            code,
            url: `https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0`,
          }));
        } else {
          return [];
        }
      });
      const flattenedEmotes = (await Promise.all(fetchedEmotes)).reduce(
        (flattenedEmotes, emotes) => [...flattenedEmotes, ...emotes],
        []
      );
      return flattenedEmotes;
    } catch (err: unknown) {
      return [];
    }
  }

  private async getChannelId(...loginNames: string[]): Promise<string[]> {
    if (!loginNames.length) {
      return [];
    }
    try {
      const channelsRes = await axios.get<TTVUsersResponse>(
        `https://api.twitch.tv/helix/users?login=${loginNames.join(",")}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Client-Id": AppConfig.ttvClientId,
          },
        }
      );
      const channels = channelsRes.data;
      return channels.users.map((u) => u._id);
    } catch (err: unknown) {
      return [];
    }
  }
}
const twitchTvClient = new TwitchTvClient();

export const initTwitchTvClient = async (): Promise<TwitchTvClient> => {
  try {
    const accessTokenRes = await axios.post<TTVAuthRes>(
      `https://id.twitch.tv/oauth2/token?client_id=${AppConfig.ttvClientId}&client_secret=${AppConfig.ttvClientSecret}&grant_type=client_credentials`
    );

    const accessToken = accessTokenRes.data.access_token;
    (twitchTvClient as any).accessToken = accessToken;
  } catch (err: unknown) {
    console.log(err);
  }
  return twitchTvClient;
};

export default twitchTvClient;
