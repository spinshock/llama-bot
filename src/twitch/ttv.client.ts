import fetch from "node-fetch";
import { EmoteDTO } from "../api/models/emote.dto";
import { Emote } from "../database/entities/Emote.entity";
import { TwitchEmotesChannelRes } from "../models/twitch-emotes/twitch-emotes.model";
import { TTVUsersResponse } from "../models/twitch/ttv-users-res.model";
interface TTVAuthRes {
    access_token: string;
    expires_in: number;
    scope: string[];
    token_type: string;
}
export class TTVClient {
    private accessToken: string;

    constructor(private readonly clientId: string, private readonly clientSecret: string) {
        this.getAccessToken();
    }

    public async getEmotesForChannelIds(ids: string[]): Promise<EmoteDTO[]> {
        let emotes: Emote[] = [];
        const fetchedEmotes = ids.map(async (id) => {
            const emotesRes = await fetch(`https://api.twitchemotes.com/api/v4/channels/${id}`);
            const { emotes } = await emotesRes.json() as TwitchEmotesChannelRes;
            if (emotes && emotes.length) {
                return emotes.map(({ code, id }) => ({
                    code,
                    url: `https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0`,
                }));
            } else {
                return [];
            }
        });
        const flattenedEmotes = (await Promise.all(fetchedEmotes)).reduce((flattenedEmotes, emotes) => [...flattenedEmotes, ...emotes], []);
        return flattenedEmotes;
    }

    public async getChannelId(...loginNames: string[]): Promise<string[]> {
        return await fetch(`https://api.twitch.tv/kraken/users?login=${loginNames.join(',')}`,
        {
          headers: {
              'Authorization': `bearer ${this.accessToken}`,
              'Accept': 'application/vnd.twitchtv.v5+json',
              'Client-ID': this.clientId,
          }  
        })
            .then(res => res.json())
            .then((res: TTVUsersResponse) => res.users.map((u) => u._id));
    }
    
    private getAccessToken(): void {
        fetch(`https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`, { method: 'POST' })
            .then((res) => res.json())
            .then((res: TTVAuthRes) => this.accessToken = res.access_token);
        
    }
}