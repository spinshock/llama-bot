import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Emote } from "../models/emote";

interface EmotesResponse {
  emotes: Emote[];
}

export const useEmotes = (): [
  Emote[],
  boolean,
  Error | AxiosError | undefined
] => {
  let [emotes, setEmotes] = useState<Emote[]>([]);
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [error, setError] = useState<Error | AxiosError>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data }: { data: EmotesResponse } = await axios({
        method: "GET",
        url: "api/emote",
      });
      setEmotes(data.emotes);
    } catch (error: unknown) {
      setError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [emotes, isLoading, error];
};
