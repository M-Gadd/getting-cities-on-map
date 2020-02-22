import React from "react";
import "./App.css";
import Home from "./Components/Home";
import { Container } from "reactstrap";

function App() {
  return (
    <div className="App">
      <Container>
        <Home />
      </Container>
    </div>
  );
}

export default App;
