let express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");

let router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
