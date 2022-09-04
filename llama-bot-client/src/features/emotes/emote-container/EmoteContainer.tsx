import { toast } from "react-toastify";
import { Emote } from "../models/emote";
import "./EmoteContainer.scss";

export type EmoteProps = Emote;

const copyToClipboard = async (text: string): Promise<void> => {
  await navigator.clipboard.writeText(text);
  toast("Copied to clipboard!");
};

export const EmoteContainer = ({ url, code, author }: EmoteProps) => {
  return (
    <div className="emote-container" onClick={() => copyToClipboard(code)}>
      <img src={url} />
      <p>{code}</p>
      <p>{author}</p>
    </div>
  );
};
