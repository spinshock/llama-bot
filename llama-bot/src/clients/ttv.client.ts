import axios from "axios";
import { Emote } from "../models/emote";
import { TwitchEmotesChannelRes } from "../models/twitch-emotes/twitch-emotes.model";
import { TTVUsersResponse } from "../models/twitch/ttv-users-res.model";
interface TTVAuthRes {
  access_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}
export class TTVClient {
  private accessToken!: string;

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {
    this.setAccessToken();
  }

  public async getEmotesForChannelIds(ids: string[]): Promise<Emote[]> {
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

  public async getChannelId(...loginNames: string[]): Promise<string[]> {
    if (!loginNames.length) {
      return [];
    }
    try {
      const channelsRes = await axios.get<TTVUsersResponse>(
        `https://api.twitch.tv/kraken/users?login=${loginNames.join(",")}`,
        {
          headers: {
            Authorization: `bearer ${this.accessToken}`,
            Accept: "application/vnd.twitchtv.v5+json",
            "Client-ID": this.clientId,
          },
        }
      );
      const channels = channelsRes.data;
      return channels.users.map((u) => u._id);
    } catch (err: unknown) {
      return [];
    }
  }

  private async setAccessToken(): Promise<void> {
    try {
      const accessTokenRes = await axios.post<TTVAuthRes>(
        `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`
      );

      const accessToken = accessTokenRes.data;
      this.accessToken = accessToken.access_token;
    } catch (err: unknown) {
      console.log(err);
    }
  }
}
