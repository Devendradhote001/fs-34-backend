const { default: mongoose } = require("mongoose");

let commentSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let CommentModel = mongoose.model("comments", commentSchema);
module.exports = CommentModel;
