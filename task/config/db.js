const { default: mongoose } = require("mongoose");

let connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("mongodb connected");
};

module.exports = connectDB;
