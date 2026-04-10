const express = require("express");
const connectDB = require("./config/db");
const UserModel = require("./models/user.model");

const app = express();
app.use(express.json());

connectDB();

// create--
app.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        message: "All fields are required",
      });
    }

    let newUser = await UserModel.create({
      name,
      email,
      password,
    });

    return res.json({
      message: "User registered",
      user: newUser,
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});

// Read---
app.get("/users", async (req, res) => {
  try {
    let users = await UserModel.find();

    return res.json({
      message: "Users fetched",
      users,
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});

// dynamic reading---
app.get("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.json({
        message: "Id is required",
      });
    }

    // let user = await UserModel.findById(id);

    // let user = await UserModel.findOne({
    //   email: id,
    // });

    let user = await UserModel.find({
      email: id,
    });

    return res.json({
      message: "User fetched",
      user,
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});

// update user---
app.put("/user/update/:id", async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      return res.json({
        message: "Id not found",
      });
    }

    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        message: "All fields are required",
      });
    }

    let updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
      },
      {
        new: true,
      }
    );

    return res.json({
      message: "user updated",
      user: updatedUser,
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});

app.delete("/user/delete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.json({
        message: "Id not found! unauthorized user",
      });
    }

    await UserModel.findByIdAndDelete(id);

    return res.json({
      message: "User deleted",
    });
  } catch (error) {
    return res.json({
      message: "Internal server error",
      error,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
