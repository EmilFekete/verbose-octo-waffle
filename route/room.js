const express = require("express");

class RoomRouter {
  router;
  constructor(controller) {
    this.router = express.Router();
    this.itemRouter = express.Router({ mergeParams: true });
    this.router.use("/:roomId", this.itemRouter);
    this.router.get("/:roomId", controller.getRoom);
    this.itemRouter.post("/add-video", controller.addVideo);
    this.itemRouter.post("/vote", controller.vote);
  }
}

module.exports = RoomRouter;
