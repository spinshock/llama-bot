export interface BTTVEmotesRes {
  emotes: BTTVEmote[];
}

export interface BTTVEmote {
  id: string;
  code: string;
}

export interface BTTVTopEmote {
  emote: BTTVEmote;
}
