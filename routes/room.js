const express = require("express");

const controller = require("../controllers/room");

const roomRouter = express.Router();
const roomItemRouter = express.Router({ mergeParams: true });

roomRouter.use("/:roomId", roomItemRouter);

roomRouter.get("/:roomId", controller.getRoom);

roomItemRouter.post("/add-video", controller.addVideo);

roomItemRouter.post("/vote", controller.vote);

module.exports = roomRouter;