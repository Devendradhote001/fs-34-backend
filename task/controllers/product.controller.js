const ProductModel = require("../models/product.model");

let createProductController = async (req, res) => {
  try {
    let { productName, productTitle, description, amount, currency, category } =
      req.body;

    if (!productName || !productTitle || !description || !amount || !currency)
      return res.status(400).json({
        message: "All fields are required",
      });

    let product = await ProductModel.create({
      productName,
      productTitle,
      description,
      price: {
        amount,
        currency,
      },
      category,
    });

    return res.status(201).json({
      message: "Product created",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

let getAllProductController = async (req, res) => {
  try {
    let allProducts = await ProductModel.find();

    return res.status(200).json({
      message: "Products fetched successfully",
      products: allProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  createProductController,
  getAllProductController,
};
