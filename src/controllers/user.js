const httpStatus = require("http-status");

const { catchAsync } = require("../utils");
const { UserService } = require("../services");

const getAllUsers = catchAsync(async (req, res) => {
  const results = await UserService.getAllUsers(req.query);
  res.sendResponse(httpStatus.OK, { ...results });
});

const createUser = catchAsync(async (req, res) => {
  const user = await UserService.createUser(req.body);
  res.sendResponse(httpStatus.CREATED, { ...user.toJSON() });
});

module.exports = {
  getAllUsers,
  createUser,
};
