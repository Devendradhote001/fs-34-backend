const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected DB");
  } catch (error) {
    console.log("error in db", error);
  }
};

module.exports = connectDB;
