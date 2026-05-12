const { default: mongoose } = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    mobile: {
      type: String,
      minlength: 10,
      maxlength: 10,
      trim: true,
    },
    refreshToken: String,
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.log("error in pre method", error);
  }
});

userSchema.methods.generateJWT = function () {
  let token = jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  let checkPass = await bcrypt.compare(password, this.password);
  return checkPass;
};

let UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
