import * as React from "react";
import { render } from "react-dom";import Chart from "./Chart";

const { useState } = React;
const rootElement = document.getElementById("root");


import "./style.css";

const App = () => {
  const [toggled, setToggled] = useState(false);


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
