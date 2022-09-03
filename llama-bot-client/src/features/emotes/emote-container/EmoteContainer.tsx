import { Emote } from "../models/emote";
import "./EmoteContainer.scss";

export type EmoteProps = Emote;

export const EmoteContainer = ({ url, code, author }: EmoteProps) => {
  return (
    <div className="emote-container">
      <img src={url} />
      <p>{code}</p>
      <p>{author}</p>
    </div>
  );
};
