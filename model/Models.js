const mongoose = require("mongoose");

const YoutubeVideoSchema = new mongoose.Schema({
  url: String,
  voteCount: Number,
  description: String,
  uploadDate: Date,
});

const YoutubeVideo = new mongoose.model("YoutubeVideo", YoutubeVideoSchema);

const RoomSchema = new mongoose.Schema({
  name: String,
  videos: [YoutubeVideoSchema],
});

const Room = mongoose.model("Room", RoomSchema);

module.exports.Room = Room;
module.exports.YoutubeVideo = YoutubeVideo;
