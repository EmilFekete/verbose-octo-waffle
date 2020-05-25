const Room = require("../models/room");

exports.createRoom = (req, res, next) => {
  const room = new Room({ name: req.body.name });
  room.save().then((err) => {
    console.log("Room Saved!");
    console.log(room);
    res.redirect(`/room/${room._id}`);
  });
};

exports.getHome = (req, res, next) => {
  res.render("index");
};
