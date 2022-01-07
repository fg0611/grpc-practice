"use strict";

const { GameService, grpc } = require("fg-proto-loader");
const port = process.env.GRPC_PORT ?? 5000;

const client = new GameService(
  `localhost:${port}`,
  grpc.credentials.createInsecure()
);

module.exports = client;
