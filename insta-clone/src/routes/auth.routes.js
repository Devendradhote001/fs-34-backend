let express = require("express");
const {
  registerController,
  loginController,
  resetPasswordController,
  forgetPasswordController,
} = require("../controllers/auth.controller");

let router = express.Router();

router.get("/reset-password/:token", resetPasswordController);

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forget-password", forgetPasswordController);

module.exports = router;
