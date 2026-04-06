import express from "express";
import { connectDB } from "./config/db.js";
import { UserModel } from "./models/user.model.js";

let app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/save-user", async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "All fields are required",
    });
  }

  let user = await UserModel.create({
    name: name,
    email: email,
    password: password,
  });

  return res.json({
    message: "User saved successfully",
    user,
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
