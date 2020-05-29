const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const appRoot = require("app-root-path");
const db = require(appRoot + "/util/database");
require("dotenv").config();
const logger = require(appRoot + "/util/logger");

const app = express();

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "pug");

app.use(logger.loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 365 * 24 * 60 * 60 * 1000 },
    store: db.sessionStore,
  })
);
app.use(express.static(path.join(__dirname, "public")));

//Route config needs to happen after express config
const container = require("./container/container");
app.use("/", container.HomeRouter.router);
app.use("/room", container.RoomRouter.router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
