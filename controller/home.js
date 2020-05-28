const Room = require("../models/room");

class HomeController {
  createRoom = (req, res, next) => {
    const room = new Room({ name: req.body.name });
    room.save().then((err) => {
      console.log("Room Saved!");
      console.log(room);
      res.redirect(`/room/${room._id}`);
    });
  };

  getHome = (req, res, next) => {
    res.render("home");
  };
}

module.exports = HomeController;
