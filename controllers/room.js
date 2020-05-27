const Room = require("../models/room");
const Video = require("../models/video");

exports.getRoom = (req, res, next) => {
  Room.findById(req.params["roomId"]).then((room) => {
    res.render("room", {
      room: room,
    });
  });
};

exports.addVideo = (req, res, next) => {
  Room.findById(req.params["roomId"]).then((room) => {
    const video = new Video({
      url: req.body.url,
      description: req.body.description,
      voteCount: 0,
    });
    room.videos.push(video);
    room.save().then(() => {
      res.redirect(`/room/${room._id}`);
    });
  });
};

exports.vote = (req, res, next) => {
  Room.findById(req.params["roomId"]).then((room) => {
    console.log(`VideoID: ${req.body.videoId}`);
    const video = room.videos.find(
      (i) => req.body.videoId.toString() === i._id.toString()
    );
    video.voteCount++;
    console.log(video.voteCount);
    room.markModified("videos");
    room.save().then(() => {
      res.redirect(`/room/${room.id}`);
    });
  });
};