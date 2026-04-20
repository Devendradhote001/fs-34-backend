require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authmiddleware");
const cors = require("cors");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged in user",
    user: req.user,
  });
});

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
