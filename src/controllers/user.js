const httpStatus = require("http-status");

const { catchAsync } = require("../utils");
const { UserService } = require("../services");

const getAllUsers = catchAsync(async (req, res) => {
  const results = await UserService.getAllUsers(req.query);
  res.sendResponse(httpStatus.OK, { ...results });
});

module.exports = {
  getAllUsers,
};
