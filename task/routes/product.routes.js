const express = require("express");
const {
  createProductController,
  getAllProductController,
} = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const { route } = require("./auth.routes");
const upload = require("../config/multer");

const router = express.Router();

router.post(
  "/create-product",
  authMiddleware,
  adminMiddleware,
  createProductController
);
router.get("/", getAllProductController);
router.post("/get-image", upload.array("images", 5), (req, res) => {
  let data = req.files;
  console.log(data);

  return res.send("image milgyi");
});

module.exports = router;
