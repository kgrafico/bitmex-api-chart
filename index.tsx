import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import {
  port,
  testnet,
  symbols,
  streams,
  apiKeyID,
  apiKeySecret,
  maxTableLen
} from "./lib/config";

const rootElement = document.getElementById("root");

import "./style.css";

const App = () => {
  const [toggled, setToggled] = useState(false);

  const config = {
    port,
    testnet,
    symbols,
    streams,
    apiKeyID,
    apiKeySecret,
    maxTableLen
  };

  const setToggle = () => {
    setToggled(!toggled);
  };

  return (
    <div className="App">
      <button onClick={() => setToggle()}>Toggle Chart</button>
      <Chart toggle={toggled} />
    </div>
  );
};

render(<App />, rootElement);
