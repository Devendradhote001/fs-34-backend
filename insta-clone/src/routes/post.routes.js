let express = require("express");
const {
  createPostController,
  getAllPostController,
  likesController,
} = require("../controllers/post.controller");
const upload = require("../config/multer");
const authMiddleware = require("../middlewares/auth.middleware");
let router = express.Router();

router.post(
  "/create",
  authMiddleware,
  upload.array("images", 5),
  createPostController
);

router.get("/", getAllPostController);

router.get("/likes/:postId", authMiddleware, likesController);

module.exports = router;
