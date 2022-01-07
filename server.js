"use strict";

const pino = require("pino");
const grpc = require("@grpc/grpc-js");
const {
  GameService,
  createGame,
  listGames,
  joinGame,
} = require("fg-game-service");

const port = 5000;

const transport = pino.transport({
  target: "pino-pretty",
  options: { colorize: true },
});

const logger = pino({ level: "info" }, transport);

const server = new grpc.Server();
server.addService(GameService.service, {
  createGame,
  listGames,
  joinGame,
});

/*  */
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info("gRPC Server running on port " + port);
  }
);
