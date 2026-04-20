const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

let authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(404).json({
        message: "Token not found",
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode)
      return res.status(401).json({
        message: "Invalid token",
      });

    let user = await UserModel.findById(decode.id);

    req.user = user;
    next();
  } catch (error) {
    console.log("error in middleware", error);
  }
};

module.exports = authMiddleware;
