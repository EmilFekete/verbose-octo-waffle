const Bottle = require("bottlejs");

const HomeController = require("../controllers/home");
const HomeRouter = require("../routes/home");
const RoomController = require("../controllers/room");
const RoomRouter = require("../routes/room");

const bottle = new Bottle();
bottle.serviceFactory("HomeController", () => {
  return new HomeController();
});
bottle.serviceFactory(
  "HomeRouter",
  (controller) => {
    return new HomeRouter(controller);
  },
  "HomeController"
);
bottle.serviceFactory("RoomController", () => {
  return new RoomController();
});
bottle.serviceFactory(
  "RoomRouter",
  (controller) => {
    return new RoomRouter(controller);
  },
  "RoomController"
);

module.exports = bottle.container;
