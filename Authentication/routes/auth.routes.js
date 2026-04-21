const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", authMiddleware, logoutController);

module.exports = router;
