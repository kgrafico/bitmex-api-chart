import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = (props: HighchartsReact.Props, toggle) => {
  const ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD"
  );

  const timeout = 60000;
  const options: Highcharts.Options = {
    title: {
      text: "Beeks Analytics"
    },
    series: [
      {
        name: "Installation",
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      },
      {
        name: "Manufacturing",
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }
    ]
  };

  const [data, setData] = useState(options);

  const connect = () => {
    const subscribe = {
      event: "bts:subscribe",
      data: {
        channel: ``
      }
    };
    ws.onopen = () => {
      console.log("connected websocket main component");
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
        <HighchartsReact highcharts={Highcharts} options={data} {...props} />
      </div>
    );
  }

  return "";
};
export default Chart;
