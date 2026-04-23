const express = require("express");
const {
  createProductController,
  getAllProductController,
} = require("../controllers/product.controller");

const router = express.Router();

router.post("/create-product",  createProductController);
router.get("/", getAllProductController);

module.exports = router;
