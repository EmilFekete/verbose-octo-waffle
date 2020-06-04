const Bottle = require("bottlejs");
const appRoot = require("app-root-path");
const HomeController = require(appRoot + "/controller/home");
const HomeRouter = require(appRoot + "/route/home");
const RoomController = require(appRoot + "/controller/room");
const RoomRouter = require(appRoot + "/route/room");
const AuthController = require(appRoot + "/controller/auth");
const AuthRouter = require(appRoot + "/route/auth");

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

bottle.serviceFactory(AuthController.name, () => {
  return new AuthController();
});

bottle.serviceFactory(
  AuthRouter.name,
  (controller) => {
    return new AuthRouter(controller);
  },
  AuthController.name
);

module.exports = bottle.container;
