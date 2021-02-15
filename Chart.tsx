import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = (props: HighchartsReact.Props) => {
  const [data, setData] = useState(null);
  const ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD"
  );

  const timeout = 60000;
  const options: Highcharts.Options = {
    title: {
      text: "My chart"
    },
    series: [
      {
        type: "line",
        data: [1, 2, 3]
      }
    ]
  };

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

  if (true) {
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} {...props} />
      </div>
    );
  }

  return "";
};
export default Chart;
