const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const Room = require("../model/Models").Room;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/create-room", function (req, res, next) {
  const room = new Room({ name: req.body.name });
  room.save().then((err) => {
    console.log("Room Saved!");
    console.log(room);
    res.redirect(`/room/${room._id}`);
  });
});

module.exports = router;
