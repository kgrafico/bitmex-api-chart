import React, { useEffect, useState } from "react";
import axios from "axios";

const Chart = ({ toggle }) => {
  const url =
    "www.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBTUSD";

  const getallInformation = async () => {
    try {
      const userPosts = await axios.get(url);
      console.log(userPosts.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getallInformation();
    const interval = setInterval(() => {
      getallInformation();
    }, 60000);

    return () => clearInterval(interval);
  });

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
