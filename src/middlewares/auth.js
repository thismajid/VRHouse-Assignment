const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const { mainConfigs } = require("../configs");

module.exports = () => async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: false,
      data: {},
      message: "No authorization token",
    });
  }

  if (!req.headers.authorization.split("Bearer ")[1]) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: false,
      data: {},
      message: "No authorization token",
    });
  }

  const jwtToken = req.headers.authorization.split("Bearer ")[1];

  try {
    await jwt.verify(jwtToken, mainConfigs.jwt.secret);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: false,
        data: {},
        message: "Jwt expire time error",
      });
    }
  }

  next();
};
