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
  const [emotes, setEmotes] = useState<Emote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | AxiosError>();

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
