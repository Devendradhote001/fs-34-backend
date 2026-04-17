const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let registerController = async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let isExisted = await UserModel.findOne({ email });

    if (isExisted)
      return res.status(409).json({
        message: "User already exists, please login",
      });

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
      mobile,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "User registered",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

let loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "Email and password are required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    let checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass)
      return res.status(401).json({
        message: "Invalid credentials",
      });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "User loggedin",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
