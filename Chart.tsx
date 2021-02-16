import React, { useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module

const Chart = (props: HighchartsReact.Props) => {
  const ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD"
  );

  const timeout = 60000;
  const [dataBuyPrice, setDataBuyPrice] = useState([]);
  const [dataSellPrice, setDataSellPrice] = useState([]);
  const [time, setTime] = useState([]);
  const [min, setMin] = useState(48000);
  const [max, setMax] = useState(49000);

  const options: Highcharts.Options = {
    title: {
      text: "Beeks Analytics Liquidation"
    },
    yAxis: {
      min: min,
      max: max,
      title: {
        text: "Prices"
      }
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date"
      },
      categories: time
    },
    series: [
      {
        name: "Buy",
        type: "spline",
        data: dataBuyPrice
      },
      {
        name: "Sell",
        type: "spline",
        data: dataSellPrice
      },
      {
        name: "Trade",
        type: "spline",
        data: []
      },
      {
        type: "pie",
        name: "Total consumption",
        data: [
          {
            name: "Buy",
            y: dataBuyPrice.length,
            color: Highcharts.getOptions().colors[0]
          },
          {
            name: "Sell",
            y: dataSellPrice.length,
            color: Highcharts.getOptions().colors[1]
          },
          {
            name: "Trade",
            y: dataSellPrice.length + dataBuyPrice.length,
            color: Highcharts.getOptions().colors[2]
          }
        ],
        center: [100, 20],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false
        }
      }
    ],
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        }
      }
    }
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
          setMin(el.price - 300);
          setMax(el.price + 300);

          // Set dataSellPrice & dataTradesPrice
          if (el.side === "Sell") {
            setDataSellPrice(oldPrice => [...oldPrice, el.price]);
          }
          if (el.side === "Buy") {
            setDataBuyPrice(oldPrice => [...oldPrice, el.price]);
          }

          setTime(oldTime => [
            ...oldTime,
            new Date(el.timestamp).toTimeString().split(" ")[0]
          ]);
        });
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
        <HighchartsReact
          constructorType={"chart"}
          highcharts={Highcharts}
          options={options}
          {...props}
        />
      </div>
    );
  }

  return "";
};
export default Chart;
