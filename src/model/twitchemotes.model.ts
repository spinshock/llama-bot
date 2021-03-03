export interface TTVEmotesRes {
    id: string;
    code: string;
}

export interface TwitchEmotesChannelRes {
    emotes: { code: string; id: number; }[];
}