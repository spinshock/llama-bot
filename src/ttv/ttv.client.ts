import fetch from "node-fetch";
import { TTVEmoteMap } from "../model/ttv-emote-map.model";
import { TwitchEmotesChannelRes } from "../model/twitchemotes.model";
import { TTVUsersResponse } from "./ttv-users-res.model";
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

    public async getEmotesForChannelIds(ids: string[]): Promise<TTVEmoteMap> {
        let emotes: TTVEmoteMap;
        for(let i = 0; i < ids.length; i++) {
            const fetchedEmotes: TTVEmoteMap = await fetch(`https://api.twitchemotes.com/api/v4/channels/${ids[i]}`)
                .then((res) => res.json())
                .then(({ emotes }: TwitchEmotesChannelRes) => {
                    if (emotes && emotes.length) {
                        return emotes.reduce((accEmotes, { code, id }) => ({
                            ...accEmotes,
                            [code]: `https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0`,
                        }), {}) as TTVEmoteMap;
                    }
                })
            emotes = {
                ...emotes, 
                ...fetchedEmotes,
            };
        }
        return emotes;
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