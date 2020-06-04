const mongoose = require("mongoose");
const appRoot = require("app-root-path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const logger = require(appRoot + "/util/logger");

const connectToDB = (app) => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("Connected!");
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        expires: 365 * 24 * 60 * 60 * 1000,
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "sessions",
      }),
    })
  );
};

exports.connectToDB = connectToDB;
