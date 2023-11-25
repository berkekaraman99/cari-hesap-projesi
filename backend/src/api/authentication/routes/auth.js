const express = require("express");

const authController = require("../controller/auth");

const router = express.Router();

//POST LOGIN
router.post("/login", authController.login);

//POST SIGNUP
router.post("/signup", authController.signup);

module.exports = router;
