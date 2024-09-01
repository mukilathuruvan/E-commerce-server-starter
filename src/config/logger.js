import { createLogger, format, transports } from "winston";

const { json, timestamp, colorize, combine } = format;

const logger = createLogger({
  level: "info",

  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    json(),
    colorize()
  ),

  transports: [
    new transports.File({
      filename: "./logs/app.log",
    }),
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

export default logger;
