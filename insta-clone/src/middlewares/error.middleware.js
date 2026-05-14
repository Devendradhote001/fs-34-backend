let errorMiddleware = (err, req, res, next) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorMiddleware;
