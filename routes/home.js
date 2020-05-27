const express = require("express");
class HomeRouter {
  router;
  constructor(controller) {
    this.router = express.Router();
    this.router.get("/", controller.getHome);
    this.router.post("/create-room", controller.createRoom);
  }
}

module.exports = HomeRouter;
