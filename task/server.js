require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

connectDB();

const app = express();
// body parser--
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.listen(3000, () => {
  console.log("server is started");
});
