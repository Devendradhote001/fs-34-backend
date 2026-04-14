const express = require("express");
const connectDB = require("./config/db");
const UserModel = require("./models/user.model");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.post("/register", async (req, res) => {
  try {
    // 1.Received Registration data
    let { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
      return res.json({
        message: "All fields are required",
      });
    }

    // 2. hash password
    let hashedPass = await bcrypt.hash(password, 10);
    console.log(hashedPass);

    // 3. create user in db
    let newUser = await UserModel.create({
      name,
      email,
      password: hashedPass,
      mobile,
    });

    // 4. Generate jwt token
    let token = jwt.sign(
      { id: newUser._id },
      "OjW1LxEE40mvNixwTI46HQWkIVezWADiu8mietKEONs",
      {
        expiresIn: "1h",
      }
    );

    // 5. Save token in cookies
    res.cookie("token", token);

    // 6. send res
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
