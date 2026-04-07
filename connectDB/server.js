const express = require("express");
const connectDb = require("./config/db");
const UserModel = require("./models/user.model");

const app = express();

app.use(express.json());

connectDb();

// create--

app.post("/register", async (req, res) => {
  let { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.json({
      message: "All fields are required",
    });
  }

  let user = await UserModel.create({
    name,
    email,
    password,
    mobile,
  });

  return res.json({
    message: "User registered",
    user,
  });
});

app.get("/users", async (req, res) => {
  let users = await UserModel.find();

  return res.json({
    message: "User fetched",
    users,
  });
});

app.listen(3000, () => {
  console.log("server chlra hai 3000 pe");
});
