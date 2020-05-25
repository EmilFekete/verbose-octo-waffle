const express = require("express");

const controller = require("../controllers/home")
const router = express.Router();

router.get("/", controller.getHome);

router.post("/create-room", controller.createRoom );

module.exports = router;
