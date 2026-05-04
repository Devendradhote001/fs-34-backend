const { default: mongoose, mongo } = require("mongoose");

let postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    caption: {
      type: String,
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let PostModel = mongoose.model("posts", postSchema);
module.exports = PostModel;
