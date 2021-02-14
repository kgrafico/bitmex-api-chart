import React, { useState } from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import test from "./lib/example";
import { port } from "./lib/config";

const rootElement = document.getElementById("root");

import "./style.css";

const App = () => {
  const [toggled, setToggled] = useState(false);
  const [data, setData] = useState([]);

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
