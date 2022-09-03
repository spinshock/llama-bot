import { getRepository } from "typeorm";
import { EmoteDTO } from "../../models/emote.dto";
import { Emote } from "../entities/Emote.entity";

export const getEmotes = async (): Promise<Emote[]> => {
  const emotesRepo = getRepository(Emote);
  return await emotesRepo.find();
};

export const getEmoteByCode = async (
  code: string
): Promise<Emote | undefined> => {
  const emotesRepo = getRepository(Emote);
  return await emotesRepo.findOne({ where: { code } });
};

export const addEmote = async (
  code: string,
  url: string,
  author: string
): Promise<Emote> => {
  const emotesRepo = getRepository(Emote);
  const createdEmote = emotesRepo.create({ code, url, author });
  const savedEmote = await emotesRepo.save(createdEmote);

  return savedEmote;
};

export const addEmotes = async (emotes: EmoteDTO[]): Promise<Emote[]> => {
  const emotesRepo = getRepository(Emote);

  const createdEmotes = emotes.map((emote) => emotesRepo.create(emote));
  const savedEmotes = await emotesRepo.save(createdEmotes);

  return savedEmotes;
};

export const removeEmote = async (code: string): Promise<Emote | undefined> => {
  const emotesRepo = getRepository(Emote);
  const foundEmote = await emotesRepo.findOne({ where: { code } });
  if (foundEmote) {
    return await emotesRepo.remove(foundEmote);
  }
  return;
};

export default { getEmotes, getEmoteByCode, addEmote, addEmotes, removeEmote };
