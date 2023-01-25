import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand className="text-white">Llama Bot</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/emotes"}>
              <Nav.Link as="span" className="text-white">
                Emotes
              </Nav.Link>
            </NavLink>
            <NavLink to={"/emoters"}>
              <Nav.Link as="span" className="text-white">
                Top Emoters
              </Nav.Link>
            </NavLink>
            <NavLink to={"/addemote"}>
              <Nav.Link as="span" className="text-white">
                Add Emote
              </Nav.Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
