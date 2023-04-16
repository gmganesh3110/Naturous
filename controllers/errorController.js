const AppError = require("../utils/appError.js");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
const hanldeDuplicateFields = (err) => {
  // const value = err[keyValue].match(/(["'])(\\?.)*?\1/)[0];
  const message = `${err}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (!err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const handleJWTError = (err) =>
  new AppError("Invalid token, Please login try again", 401);

const hanldeJWTExpiredError = (err) =>
  new AppError("Your token is expured", 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = hanldeDuplicateFields(error);
    sendErrorDev(err, res);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = hanldeJWTExpiredError(error);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
