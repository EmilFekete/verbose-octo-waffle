const mongoose = require("mongoose");
const VideoSchema = require("./video").Schema;

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    videos: {
      type: [VideoSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
