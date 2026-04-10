const express = require("express");
const connectDB = require("./config/db");
const UserModel = require("./models/user.model");
const app = express();
const cors = require("cors");

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post("/register", async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
      return res.json({
        message: "All fields are required",
      });
    }

    let newUser = await UserModel.create({
      name,
      email,
      password,
      mobile,
    });

    return res.json({
      message: "User created",
      user: newUser,
    });
  } catch (error) {
    console.log("error in register", error);
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    let users = await UserModel.find();

    return res.json({
      message: "Users fetched",
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
