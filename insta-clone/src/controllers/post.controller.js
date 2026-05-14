const PostModel = require("../models/post.model");
const sendToIK = require("../services/storage.service");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let createPostController = asyncHandler(async (req, res) => {
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
});

let getAllPostController = asyncHandler(async (req, res) => {
  let allPosts = await PostModel.find().populate("likes");

  if (!allPosts.length)
    return res.status(204).json({
      message: "Posts fetched successfully",
      posts: allPosts,
    });

  return res
    .status(200)
    .json(new ApiResponse("post fetched successfully", allPosts));

  // return res.render("index.ejs", { posts: allPosts });
});

let getSinglePostController = asyncHandler(async (req, res) => {
  let postId = req.params.postId;

  let post = await PostModel.findById(postId);

  if (!post) throw new Error("bhai galat hai");
  res.send(post);
});

let likesController = async (req, res) => {
  try {
    let postId = req.params.postId;

    if (!postId)
      return res.status(404).json({
        message: "post id not found",
      });

    let post = await PostModel.findById(postId);
    // post.likes.push(req.user._id);
    // await post.save();

    // if (post.likes.includes(req.user._id)) {
    //   let data = post.likes.filter(
    //     (elem) => JSON.stringify(elem) != JSON.stringify(req.user._id)
    //   );
    //   console.log(data);
    //   post.likes = data;
    // } else {
    //   post.likes.push(req.user._id);
    // }

    if (post.likes.includes(req.user._id)) {
      await PostModel.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: req.user._id },
        },
        {
          new: true,
        }
      );
    } else {
      await PostModel.findByIdAndUpdate(
        postId,
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        }
      );
    }

    // await post.save();
    // let post = await PostModel.findByIdAndUpdate(
    //   postId,
    //   {
    //     $push: { likes: req.user._id },
    //   },
    //   {
    //     new: true,
    //   }
    // );

    return res.status(200).json({
      message: "likes added",
      post,
    });
  } catch (error) {
    console.log("error in likes api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createPostController,
  getAllPostController,
  likesController,
  getSinglePostController,
};
