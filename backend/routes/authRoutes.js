const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.post("/loginUserType", authController.loginUserType);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/updatePassword", authController.updatePassword);

router.route("/:studentId").get(authController.getTestsOfStudent);

module.exports = router;
