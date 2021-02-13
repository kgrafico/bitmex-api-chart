import React, { Component, MouseEvent } from "react";
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

  handleClick(event: MouseEvent) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Toggle Chart</button>
        <Chart name={this.state.name} toggle={this.state.toggle} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
