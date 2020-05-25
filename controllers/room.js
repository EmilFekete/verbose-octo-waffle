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
      uploadDate: new Date(),
    });
    room.videos.push(video);
    room.save().then(() => {
      res.redirect(`/room/${room._id}`);
    });
  });
};

exports.Vote = (req, res, next) => {
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
};
