import React, { useEffect, useState } from "react";

const Chart = ({ toggle }) => {
  const [data, setData] = useState(null);
  const ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD"
  );

  const timeout = 60000;

  const connect = () => {
    const subscribe = {
      event: "bts:subscribe",
      data: {
        channel: ``
      }
    };
    ws.onopen = () => {
      console.log("connected websocket main component");
      setData({ ws: ws });
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = event => {
      const response = JSON.parse(event.data);
      console.log(response.data);
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
