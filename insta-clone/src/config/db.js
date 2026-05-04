let mongoose = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log("Mongodb error ", error);
  }
};

module.exports = connectDB;
