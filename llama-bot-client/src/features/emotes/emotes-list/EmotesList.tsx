import { Container, Spinner } from "react-bootstrap";
import { EmoteContainer } from "../emote-container/EmoteContainer";
import { useEmotes } from "../hooks/useEmotes";
import "./EmotesList.scss";

export const EmotesList = () => {
  // const emotes: Emote[] = [
  //   {
  //     url: "https://c.tenor.com/x6gsbPE8pSMAAAAC/tenor.gif",
  //     code: "test",
  //     author: "test",
  //   },
  //   {
  //     url: "https://c.tenor.com/x6gsbPE8pSMAAAAC/tenor.gif",
  //     code: "test",
  //     author: "test",
  //   },
  //   {
  //     url: "https://c.tenor.com/x6gsbPE8pSMAAAAC/tenor.gif",
  //     code: "test",
  //     author: "test",
  //   },
  //   {
  //     url: "https://c.tenor.com/x6gsbPE8pSMAAAAC/tenor.gif",
  //     code: "test",
  //     author: "test",
  //   },
  //   {
  //     url: "https://c.tenor.com/x6gsbPE8pSMAAAAC/tenor.gif",
  //     code: "test",
  //     author: "test",
  //   },
  // ];
  const [emotes, isLoading, error] = useEmotes();
  return (
    <Container className="emotes-list">
      {!isLoading &&
        emotes.map((emote, i) => (
          <EmoteContainer
            url={emote.url}
            code={emote.code}
            author={emote.author}
            key={i}
          />
        ))}
      {isLoading && <Spinner animation="border" role="status" />}
    </Container>
  );
};
