const mongoose = require("mongoose");
const httpStatus = require("http-status");

const { mainConfigs, logger } = require("../configs");
const { ApiError } = require("../utils");

exports.errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (mainConfigs.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    status: statusCode,
    timestamp: new Date().toISOString(),
    message,
    ...(mainConfigs.env === "development" && { stack: err.stack }),
  };

  if (mainConfigs.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
