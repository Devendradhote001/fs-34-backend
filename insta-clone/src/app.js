let express = require("express");
const connectDB = require("./config/db");
let authRoutes = require("./routes/auth.routes");
let cookieParser = require("cookie-parser");

connectDB();

let app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

module.exports = app;
