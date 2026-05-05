let express = require("express");
const connectDB = require("./config/db");
let authRoutes = require("./routes/auth.routes");
let postRoutes = require("./routes/post.routes");
let cookieParser = require("cookie-parser");

connectDB();

let app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
