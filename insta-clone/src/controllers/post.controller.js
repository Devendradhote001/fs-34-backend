const PostModel = require("../models/post.model");
const sendToIK = require("../services/storage.service");

let createPostController = async (req, res) => {
  try {
    let { caption } = req.body;

    let images = req.files;

    if (!images)
      return res.status(400).json({
        message: "Image is required",
      });

    let uploadedImages = await Promise.all(
      images.map(async (elem) => {
        return await sendToIK(elem.buffer, elem.originalname);
      })
    );

    let newPost = await PostModel.create({
      user_id: req.user._id,
      caption,
      imageUrl: uploadedImages.map((elem) => elem.url),
    });
    return res.status(201).json({
      message: "Post created",
      post: newPost,
    });
  } catch (error) {
    console.log("error in create post", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = {
  createPostController,
};
