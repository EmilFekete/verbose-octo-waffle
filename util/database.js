const mongoose = require("mongoose");
const appRoot = require("app-root-path");
const logger = require(appRoot + "/util/logger");

const mongoConnect = () =>
  mongoose
    .connect(
      "mongodb+srv://Femil:Pina123@verbose-octo-waffle-la5jh.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((dunno) => {
      logger.info("Connected!");
      logger.info(dunno);
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });

exports.mongoConnect = mongoConnect;
