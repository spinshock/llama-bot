import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import "./App.scss";

export const App = () => {
  return (
    <div className="app-container">
      <Container className="app-content">
        <Outlet />
      </Container>
    </div>
  );
};
