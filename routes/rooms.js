const express = require("express");
const roomRouter = express.Router();
const roomItemRouter = express.Router({ mergeParams: true });
const Room = require("../model/Models").Room;
const YoutubeVideo = require("../model/Models").YoutubeVideo;
const ObjectId = require("mongodb").ObjectId;

roomRouter.use("/:roomId", roomItemRouter);

roomRouter.get("/:roomId", function (req, res, next) {
  Room.findById(req.params["roomId"]).then((room) => {
    res.render("room", {
      room: room,
    });
  });
});

roomItemRouter.post("/add-video", function (req, res, next) {
  Room.findById(req.params["roomId"]).then((room) => {
    const video = new YoutubeVideo({
      url: req.body.url,
      description: req.body.description,
      uploadDate: new Date(),
    });
    room.videos.push(video);
    room.save().then(() => {
      res.redirect(`/room/${room._id}`);
    });
  });
});

roomItemRouter.get("/vote", function (req, res, next) {
  Room.findById(req.params["roomId"]).then((room) => {
    const video = room.videos.find((video) => {
      const searchedId = ObjectId(req.body["video-id"]);
      return video._id === searchedId;
    });
    video.voteCount++;
    video.save().then(() => {
      res.redirect(`/room/${room._id.toHexString()}`);
    });
  });
});

module.exports = roomRouter;
