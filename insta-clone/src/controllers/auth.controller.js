const UserModel = require("../models/user.model");

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

module.exports = {
  registerController,
  loginController,
};
