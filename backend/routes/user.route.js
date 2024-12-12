const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js")

router.post("/login",  userController.login);
router.post("/duplicate",userController.duplicate);
router.post("/sign-up", userController.signup);
router.get("/logout", userController.logout);

module.exports = router;