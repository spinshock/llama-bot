import { useCallback } from "react";
import { Card } from "react-bootstrap";
import { Clipboard } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { Emote } from "../models/emote";
import "./EmoteContainer.scss";

export type EmoteProps = Emote;

export const EmoteContainer = ({ url, code, author }: EmoteProps) => {
  const copyToClipboard = useCallback(async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    toast("Copied to clipboard!");
  }, [code]);

  return (
    <Card style={{ width: "18rem" }} className="emote-container">
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title className="md-2">
          <span className="mx-1">{code}</span>
          <Clipboard
            className="clipboard-btn"
            onClick={() => copyToClipboard()}
          />
        </Card.Title>
        <footer className="my-2 blockquote-footer">{author}</footer>
      </Card.Body>
    </Card>
  );
};
