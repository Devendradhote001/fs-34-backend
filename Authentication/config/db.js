const { default: mongoose } = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/fs-auth");
    console.log("mongodb connected");
  } catch (error) {
    console.log("Error in db", error);
  }
};

module.exports = connectDB;
