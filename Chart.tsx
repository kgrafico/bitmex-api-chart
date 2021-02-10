import React from "react";

export default ({ name, toggle }) => {
  if (toggle) {
    return <h1>Hello {name}!</h1>;
  }
  return <h1>Click the button</h1>;
};
