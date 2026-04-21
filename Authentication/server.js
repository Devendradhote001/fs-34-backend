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
  try {
    return res.status(200).json({
      success: true,
      message: "Logged in user",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// --- Middleware - authMiddleware

// integration

// 1. Redux bnaya tha user ke liye
// 2. Login api
// 3. set in redux state
// 4. hame reload krke dekha
// 5. redux vapis reset hogyi thi
// 6. iske liye hame backend me -> /me api bnayi thi
// --> token -> clu -> req.user -> response
// 7. useeffect create app routes ke andr
// 8. /me ko call kiya or har baar reload redux ko set kra clu
// 9. fir hamne protectedRoutes ko mainatain kiya
