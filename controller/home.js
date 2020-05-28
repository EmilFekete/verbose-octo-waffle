const appRoot = require("app-root-path");
const logger = require(appRoot + "/util/logger");
const Room = require(appRoot + "/model/room");

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
    res.render("home");
  };
}

module.exports = HomeController;
