import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useMemo, useState } from "react";
import {
  Container,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useBreakpoint } from "use-breakpoint";
import { DEFAULT_BREAKPOINTS } from "../../../responsive";
import { EmoteContainer } from "../emote-container/EmoteContainer";
import { useEmotes } from "../hooks/useEmotes";
import "./EmotesList.scss";

export const EmotesList = () => {
  const [emotes, isLoading, error] = useEmotes();
  const [search, setSearch] = useState("");
  const { breakpoint } = useBreakpoint(DEFAULT_BREAKPOINTS);
  const filteredEmotes = useMemo(() => {
    if (!search) {
      return emotes;
    }

    return emotes.filter((emote) =>
      emote.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [emotes, search]);

  return (
    <Container className="emotes-list">
      <Row className="my-2 justify-content-end w-100">
        <InputGroup
          className={breakpoint === "xs" ? "w-100" : "w-25"}
          onChange={(changeEv: ChangeEvent<HTMLInputElement>) =>
            setSearch(changeEv.target.value)
          }
        >
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputGroup.Text>
          <FormControl placeholder="Search emotes" />
        </InputGroup>
      </Row>
      <Row className="justify-content-evenly">
        {!isLoading &&
          emotes &&
          !!emotes.length &&
          filteredEmotes.map((emote, i) => (
            <EmoteContainer
              url={emote.url}
              code={emote.code}
              author={emote.author}
              key={i}
            />
          ))}
        {!isLoading && error && <p>There was an unexpected error</p>}
        {isLoading && <Spinner animation="border" role="status" />}
      </Row>
    </Container>
  );
};
