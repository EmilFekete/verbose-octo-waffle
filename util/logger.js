const winston = require("winston");
const appRoot = require("app-root-path");
const winstonDailyRotateFile = require("winston-daily-rotate-file");
const morgan = require("morgan");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "HH:mm:ss",
    }),
    winston.format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
      level: "info",
    }),
    new winstonDailyRotateFile({
      filename: "%DATE%.log",
      dirname: `${appRoot}/logs`,
      datePattern: "YYYY-MMM-DD",
      handleExceptions: true,
      handleRejections: true,
      level: "debug",
    }),
  ],
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: (message) => {
    logger.http(message);
  },
};

logger.loggerMiddleware = morgan("combined", { stream: logger.stream });
module.exports = logger;
