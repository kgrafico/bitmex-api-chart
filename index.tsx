import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import { initServer, initWS } from "./lib/serve";
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
  const [data, setData] = useState([]);

  const config = {
    port,
    testnet,
    symbols,
    streams,
    apiKeyID,
    apiKeySecret,
    maxTableLen
  };

  useEffect(() => {
    const app = initServer(config);
    initWS(app);
  }, []);

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
