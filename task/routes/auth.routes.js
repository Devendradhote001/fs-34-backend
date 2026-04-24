let express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
// router.get("/logout");

module.exports = router;
