import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export let UserModel = mongoose.model("users", userSchema);
