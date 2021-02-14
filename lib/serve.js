import { pick } from "lodash";
import express from "express";
import BitMEXClient from "bitmex-realtime-api";
const debug = require("debug")("BitMEX:Delta-Server");

const initServer = config => {
  const app = express();

  if (debug.enabled) {
    app.use(function(req, res, next) {
      debug("Got request at %s", req.url);
      next();
    });
  }

  // Readability
  if (process.env.NODE_ENV !== "production") {
    app.set("json spaces", 2);
  }

  app.get("/", function(req, res) {
    res.send(200);
  });

  app.listen(config.port, function() {
    console.log(
      "BitMEX-Delta-Server listening on http://localhost:" + config.port
    );
  });

  return app;
};

const initWS = (app, config) => {
  const client = new BitMEXClient(
    pick(
      config,
      "testnet",
      "endpoint",
      "apiKeyID",
      "apiKeySecret",
      "maxTableLen"
    )
  );

  client.on("error", function(error) {
    console.error("Caught Websocket error:", error);
  });

  client.on("end", function() {
    console.error(
      "Client closed due to unrecoverable WebSocket error. Please check errors above."
    );
    process.exit(1);
  });

  config.symbols.forEach(function(symbol) {
    config.streams.forEach(function(streamName) {
      debug(`Subscribing to ${streamName}:${symbol}.`);
      client.addStream(symbol, streamName, function(data, symbol, tableName) {
        debug("Got new data on %s:%s - %j", tableName, symbol, data);
      });
    });
  });

  app.get("/:stream", function(req, res) {
    const symbol = req.query.symbol;
    const stream = req.params.stream;
    if (symbol && config.symbols.indexOf(symbol) === -1) {
      return res.send(
        404,
        'Symbol "' + symbol + '" not found. Did you subscribe to it?'
      );
    }
    if (config.streams.indexOf(stream) === -1) {
      return res.send(
        404,
        'Stream "' + stream + '" not found. Did you subscribe to it?'
      );
    }
    res.json(client.getData(symbol, stream));
  });
};

export { initServer, initWS };
