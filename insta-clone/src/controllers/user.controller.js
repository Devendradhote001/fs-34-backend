const UserModel = require("../models/user.model");

let followUnfollowController = async (req, res) => {
  try {
    let followerId = req.params.followerId;

    if (!followerId)
      return res.status(404).json({
        message: "Invalid request",
      });

    let user = await UserModel.findById(followerId);

    if(user.followers.includes(req.user._id)){

    } else{
        
    }

  } catch (error) {
    console.log("error in FU api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
