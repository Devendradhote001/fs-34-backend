const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/fscrud");
    console.log("Connected DB");
  } catch (error) {
    console.log("error in db", error);
  }
};

module.exports = connectDB;
