import mongoose from "mongoose";

export let connectDB = async () => {
  try {
    let res = await mongoose.connect("mongodb://0.0.0.0/fs34");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in mongodb", error);
  }
};
