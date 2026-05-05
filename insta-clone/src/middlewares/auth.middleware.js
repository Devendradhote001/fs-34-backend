let jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

let authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(404).json({
        message: "Unauthorized token",
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode)
      return res.status(401).json({
        message: "Unauthorized User",
      });

    let user = await UserModel.findById(decode.id);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    req.user = user;
    next();
  } catch (error) {
    console.log("error i  md", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = authMiddleware;
