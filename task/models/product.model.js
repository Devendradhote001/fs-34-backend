const { default: mongoose } = require("mongoose");

let productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      currency: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
    category: {
      type: String,
      enum: ["MEN", "WOMEN", "KIDS", "HOUSEHOLD"],
      default: "MEN",
    },
  },
  {
    timestamps: true,
  }
);

let ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
