const dotenv = require("dotenv");
dotenv.config();
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

app.use('/hospitals', address)
app.use('/products', address)
app.use('/users', address)
app.use('/auth', address)


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
    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

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

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.json({
        message: "email and password are required",
      });

    let isExisted = await UserModel.findOne({ email });

    if (!isExisted)
      return res.json({
        message: "user not found",
      });

    let hasPass = await bcrypt.compare(password, isExisted.password);

    if (!hasPass)
      return res.json({
        message: "Invalid credentials",
      });

    let token = jwt.sign({ id: isExisted._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.json({
      message: "User Logged in",
      user: isExisted,
    });
  } catch (error) {
    console.log("error in login", error);
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
