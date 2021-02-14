import React, { useEffect, useState } from "react";

const Chart = ({ toggle }) => {
  const [data, setData] = useState(null);
  const ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD"
  );

  const timeout = 60000;

  const connect = () => {
    ws.onopen = () => {
      console.log("connected websocket main component");
      setData({ ws: ws });
    };
  };

  useEffect(() => {
    connect();
  }, []);

  if (toggle) {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }

  return "";
};
export default Chart;
