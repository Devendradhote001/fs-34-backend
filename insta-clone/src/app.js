let express = require("express");
const connectDB = require("./config/db");
let authRoutes = require("./routes/auth.routes");
let postRoutes = require("./routes/post.routes");
let cookieParser = require("cookie-parser");
let path = require("path");
const sendMailTo = require("./services/mail.service");
const errorMiddleware = require("./middlewares/error.middleware");

connectDB();

let app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// error middleware---
app.use(errorMiddleware);

module.exports = app;
