let asyncHandler = (controller) => {
  return (req, res, next) => {
    Promise.resolve(controller(req, res)).catch((error) => next(error));
  };
};

module.exports = asyncHandler;
