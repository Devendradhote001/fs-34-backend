const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    mobile: Number,
  },
  {
    timestamps: true,
  }
);

let UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
