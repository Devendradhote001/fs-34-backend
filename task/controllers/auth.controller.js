const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let registerController = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let isExisted = await UserModel.findOne({
      email,
    });

    if (isExisted)
      return res.status(409).json({
        message: "User already existed",
      });

    let hashPass = await bcrypt.hash(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("bhaiyu", token);

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
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
        message: "All fields are required",
      });

    let isExisted = await UserModel.findOne({
      email,
    });

    if (!isExisted)
      return res.status(404).json({
        message: "User not found",
      });

    let checkPass = await bcrypt.compare(password, isExisted.password);

    if (!checkPass)
      return res.status(401).json({
        message: "Invalid credentials",
      });

    let token = jwt.sign({ id: isExisted._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("bhaiyu", token);

    return res.status(200).json({
      message: "User Loggedin successfully",
      user: isExisted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
