const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

let authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(404).json({
        message: "token not found",
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);

    if (!decode)
      return res.status(400).json({
        message: "Invalid token",
      });

    let user = await UserModel.findById(decode.id);

    next();
  } catch (error) {
    console.log("error in middleware", error);
  }
};

module.exports = authMiddleware;
