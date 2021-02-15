import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = (props: HighchartsReact.Props) => {
  const ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD"
  );

  const timeout = 60000;
  const [dataBuyPrice, setDataBuyPrice] = useState([0]);
  const [dataSellPrice, setDataSellPrice] = useState([0]);
  const [dataTradesPrice, setDataTradesPrice] = useState([0]);

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

      //foreignNotional: 12
      //grossValue: 25140
      //homeNotional: 0.0002514
      //price: 47740.5
      //side: "Sell"
      //size: 12
      //symbol: "XBTUSD"
      //tickDirection: "ZeroPlusTick"
      //timestamp: "2021-02-15T12:50:43.723Z"
      //trdMatchID: "243ee4f2-7c7e-982f-d17f-5c8e0d3a953e"

      if (response.length) {
        response.forEach(el => {
          console.log("PRICE ->", el.price);
          console.log("SIDE ->", el.side);

          // Set dataSellPrice & dataTradesPrice
          if (el.side === "Sell") {
            setDataBuyPrice(oldPrice => [...oldPrice, el.price]);
          }
          if (el.side === "Buy") {
            setDataBuyPrice(oldPrice => [...oldPrice, el.price]);
          }
        });
        console.log("data Buy ->", dataBuyPrice);
        console.log("data Sell ->", dataSellPrice);
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
        <HighchartsReact highcharts={Highcharts} options={options} {...props} />
      </div>
    );
  }

  return "";
};
export default Chart;
