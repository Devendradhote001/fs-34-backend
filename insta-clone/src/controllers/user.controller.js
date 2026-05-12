const UserModel = require("../models/user.model");

let followUnfollowController = async (req, res) => {
  try {
    let followerId = req.params.followerId;

    if (!followerId)
      return res.status(404).json({
        message: "Invalid request",
      });

    let user = await UserModel.findById(followerId);

    if (user.followers.includes(req.user._id)) {
      await UserModel.findByIdAndUpdate(followerId, {
        $pull: { followers: req.user._id },
      });
    } else {
      await UserModel.findByIdAndUpdate(followerId, {
        $push: { followers: req.user._id },
      });
    }

    return res.status(200).json({
      message: "followers updated",
    });
  } catch (error) {
    console.log("error in FU api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  followUnfollowController,
};
