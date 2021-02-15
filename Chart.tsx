import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = (props: HighchartsReact.Props) => {
  const ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD"
  );

  const timeout = 60000;
  const [dataBuyPrice, setDataBuyPrice] = useState([29742, 22345, 40434]);
  const [dataSellPrice, setDataSellPrice] = useState([34567, 34567, 34567]);
  const [dataTradesPrice, setDataTradesPrice] = useState([24916, 29742, 29851]);

  const options: Highcharts.Options = {
    title: {
      text: "Beeks Analytics Liquidation"
    },
    series: [
      {
        name: "Buy",
        data: dataBuyPrice
      },
      {
        name: "Sell",
        data: dataSellPrice
      },
      {
        name: "Trades",
        data: dataTradesPrice
      }
    ]
  };

  const [option, setOptions] = useState(options);

  useEffect(() => {
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
      console.log(response);

      if (response.length) {
        response.forEach(el => {
          console.log("PRICE ->", el.price);
          setDataBuyPrice(dataBuyPrice => [...dataBuyPrice, el.price]);
        });
        console.log("data ->", dataBuyPrice);
      }
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, []);

  if (props.toggle) {
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={option} {...props} />
      </div>
    );
  }

  return "";
};
export default Chart;
