require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authmiddleware");

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/home", authMiddleware, (req, res) => {

  res.send(req.user);
});

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
