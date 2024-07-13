const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

const isauth = require("../middleware/is-auth");

router.post("/", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", isauth , authController.getSignup);

router.post("/signup", isauth , authController.postSignup);

module.exports = router;