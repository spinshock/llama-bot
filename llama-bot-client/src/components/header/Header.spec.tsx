import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./Header";

describe(Header.name, () => {
  it("should work as expected", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
  });
});
