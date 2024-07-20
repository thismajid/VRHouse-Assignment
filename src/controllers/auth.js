const httpStatus = require("http-status");

const { AuthService } = require("../services");
const { catchAsync } = require("../utils");

const login = catchAsync(async (req, res, next) => {
  const user = await AuthService.loginUserWithEmailAndPassword(req.body);
  const token = await AuthService.generateAuthTokens(user);
  res.sendResponse(httpStatus.OK, { ...token });
});

module.exports = {
  login,
};
