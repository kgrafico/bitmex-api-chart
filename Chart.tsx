import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = (props: HighchartsReact.Props) => {
  const ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD"
  );

  const timeout = 60000;
  const [data, setData] = useState([]);
  const options: Highcharts.Options = {
    title: {
      text: "Beeks Analytics"
    },
    series: [
      {
        name: "Installation",
        data: data
      },
      {
        name: "Manufacturing",
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }
    ]
  };

  const [option, setOptions] = useState(options);

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
      const response = JSON.parse(event.data).data || [];

      if (response !== []) {
        response.reduce((acc, el) => {
          console.log("PRICE", el.price);
          setData(oldPrice => [...oldPrice, el.price]);
        });
      }
    };
  };

  useEffect(() => {
    connect();
  }, []);

  if (true) {
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={option} {...props} />
      </div>
    );
  }

  return "";
};
export default Chart;
