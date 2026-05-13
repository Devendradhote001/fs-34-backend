let errorMiddleware = (err, req, res, next) => {
  console.log(err.statusCode);

  console.log("err or in middleware", err.message);

  res.status(err.statusCode).json({
    message: err.message,
    success: false,
  });
};

module.exports = errorMiddleware;
