import React, { Component } from "react";
import { render } from "react-dom";
import Chart from "./Chart";
import "./style.css";

interface AppProps {}
interface AppState {
  name: string;
  toggle: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      toggle: true
    };
  }

  render() {
    return (
      <div>
        <button>Toggle Chart</button>
        <Chart name={this.state.name} toggle={this.state.toggle} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
