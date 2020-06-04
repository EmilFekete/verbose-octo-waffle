const appRoot = require("app-root-path");
const logger = require(appRoot + "/util/logger");
const Room = require(appRoot + "/model/room");
const User = require(appRoot + "/model/user");

class HomeController {
  createRoom = (req, res, next) => {
    const room = new Room({ name: req.body.name });
    room.save().then((err) => {
      logger.info("Room Saved!");
      logger.info(room);
      res.redirect(`/room/${room._id}`);
    });
  };

  getHome = (req, res, next) => {
    req.session.reload((err) => {
      if (err) {
        logger.error(err);
      }
      if (!req.session.user) {
        const randomNum = Math.random().toString().substring(2, 10);
        const user = new User({ name: randomNum });
        req.session.user = user;
        req.session.save();
      }
      res.render("home", { user: req.session.user });
    });
  };
}

module.exports = HomeController;
