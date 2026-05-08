const UserModel = require("../models/user.model");
let jwt = require("jsonwebtoken");
const sendMailTo = require("../services/mail.service");

let registerController = async (req, res) => {
  try {
    let { username, name, email, mobile, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let isExist = await UserModel.findOne({ username });

    if (isExist)
      return res.status(409).json({
        message: "User already registered with this email",
      });

    let newUser = await UserModel.create({
      username,
      name,
      email,
      mobile,
      password,
    });

    let token = newUser.generateJWT();
    console.log("token =>", token);

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("error in register api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

let loginController = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let isExist = await UserModel.findOne({ username });

    if (!isExist)
      return res.status(404).json({
        message: "user not found",
      });

    let checkPass = isExist.comparePassword(password);
    if (!checkPass) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    let token = isExist.generateJWT();
    console.log("token =>", token);

    res.cookie("token", token);

    return res.status(200).json({
      message: "User Loggedin successfully",
      user: isExist,
    });
  } catch (error) {
    console.log("error in register api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

let forgetPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(404).json({
        message: "Email not found",
      });

    let isExisted = await UserModel.findOne({ email });

    if (!isExisted)
      return res.status(404).json({
        message: "User not found with this email",
      });

    let rawToken = jwt.sign({ id: isExisted._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    let resetLink = `http://localhost:3000/api/auth/reset-password/${rawToken}`;

    await sendMailTo(
      email,
      "reset password",
      `<a href='${resetLink}'> click here</a>`
    );

    return res.status(200).json({
      message: "Reset link sent",
    });
  } catch (error) {
    console.log("error in fp api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

let resetPasswordController = async (req, res) => {
  try {
    let token = req.params.token;

    if (!token)
      return res.status(400).json({
        message: "Invalid request",
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode)
      return res.status(401).json({
        message: "Unauthorized request",
      });

    let user = await UserModel.findById(decode.id);

    if (!user)
      return res.status(401).json({
        message: "Unauthorized request",
      });

    return res.render("reset.ejs", { id: user._id });
  } catch (error) {
    console.log("error in fp api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  resetPasswordController,
  forgetPasswordController,
};
