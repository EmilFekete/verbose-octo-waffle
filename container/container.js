const Bottle = require("bottlejs");

const HomeController = require("../controllers/home");
const HomeRouter = require("../routes/home");
const RoomController = require("../controllers/room");
const RoomRouter = require("../routes/room");

const bottle = new Bottle();
bottle.serviceFactory(HomeController.name, () => {
  return new HomeController();
});
bottle.serviceFactory(
  HomeRouter.name,
  (controller) => {
    return new HomeRouter(controller);
  },
  HomeController.name
);
bottle.serviceFactory(RoomController.name, () => {
  return new RoomController();
});
bottle.serviceFactory(
  RoomRouter.name,
  (controller) => {
    return new RoomRouter(controller);
  },
  RoomController.name
);

module.exports = bottle.container;
