const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const {
  Types: { ObjectId },
} = require("mongoose");

const { ApiError } = require("../utils");
const { mainConfigs } = require("../configs");
const { UserRepository } = require("../repositories");

const loginUserWithEmailAndPassword = async ({ email, password }) => {
  const user = await UserRepository.findByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    mainConfigs.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = await generateToken(user.id, accessTokenExpires);

  return {
    token: accessToken,
    expires: accessTokenExpires.toDate(),
  };
};

const generateToken = async (
  userId,
  expires,
  secret = mainConfigs.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type: "access",
  };
  return jwt.sign(payload, secret);
};

module.exports = {
  loginUserWithEmailAndPassword,
  generateAuthTokens,
  generateToken,
};
