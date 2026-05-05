let express = require("express");
const { createPostController } = require("../controllers/post.controller");
const upload = require("../config/multer");
const authMiddleware = require("../middlewares/auth.middleware");
let router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.array("images", 5),
  createPostController
);

module.exports = router;
