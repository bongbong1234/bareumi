const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js")

router.get("/logout",userController.logout);

router.post("/login",  userController.login);
router.post("/duplicate",userController.duplicate);
router.post("/sign-up", userController.signup);
router.post("/pwd-chk",userController.pwdChk);
router.post("/send-validate",userController.validateSend);

router.put("/validate",userController.validate);
router.put("/change-password",userController.pwdChange);

router.delete("/delete-account",userController.userDelete);

module.exports = router;