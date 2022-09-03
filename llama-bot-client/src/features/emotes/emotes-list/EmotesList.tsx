import { Container, Spinner } from "react-bootstrap";
import { EmoteContainer } from "../emote-container/EmoteContainer";
import { useEmotes } from "../hooks/useEmotes";
import "./EmotesList.scss";

export const EmotesList = () => {
  const [emotes, isLoading, error] = useEmotes();
  return (
    <Container className="emotes-list">
      {!isLoading &&
        emotes &&
        emotes.length &&
        emotes.map((emote, i) => (
          <EmoteContainer
            url={emote.url}
            code={emote.code}
            author={emote.author}
            key={i}
          />
        ))}
      {!isLoading && error && <p>There was an unexpected error</p>}
      {isLoading && <Spinner animation="border" role="status" />}
    </Container>
  );
};
