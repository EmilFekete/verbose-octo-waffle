const mongoose = require("mongoose");
const appRoot = require("app-root-path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const logger = require(appRoot + "/util/logger");

const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "session",
});

const mongoConnect = () =>
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((dunno) => {
      logger.info("Connected!");
      logger.info(dunno);
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });

exports.mongoConnect = mongoConnect;
exports.sessionStore = store;
