const { default: mongoose } = require("mongoose");

let connectDb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/tillu");
    console.log("mongoDB connected");
  } catch (error) {
    console.log("error in connecting db");
  }
};

module.exports = connectDb;
