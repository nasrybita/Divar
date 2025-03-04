"use strict";

const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "error.log" })],
});

module.exports = (err, req, res, next) => {
  let message = err.message;

  const environment =
    req.headers["x-debug-env"]?.toLowerCase() ||
    process.env.NODE_ENV ||
    "development";

  if (environment === "production") {
    if (err.isJoi) {
      message = "Invalid input data"; // General error message for production
    } else {
      message = "An unexpected error occurred";
    }
  }

  // Log the error for debugging
  logger.error(err.stack);

  res.status(400).send({ message });
};
