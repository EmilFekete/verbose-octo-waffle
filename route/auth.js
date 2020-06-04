const express = require("express");

class AuthRouter {
  router;
  constructor(controller) {
    this.router = express.Router();
    this.router.get("/signup", controller.getSignup);
    this.router.post("/signup", controller.signup);
    this.router.get("/login", controller.getLogin);
    this.router.post("/login", controller.login);
    this.router.post("/logout", controller.logout);
  }
}

module.exports = AuthRouter;
