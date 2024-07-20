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

const getEachUser = catchAsync(async (req, res) => {
  const user = await UserService.getEachUser(req.params.id);
  res.sendResponse(httpStatus.OK, { ...user.toJSON() });
});

const updateEachUser = catchAsync(async (req, res) => {
  const user = await UserService.updateUser(req.params.id, req.body);
  res.sendResponse(httpStatus.OK, { ...user.toJSON() });
});

const deleteEachUser = catchAsync(async (req, res) => {
  await UserService.deleteUser(req.params.id);
  res.sendResponse(httpStatus.OK, {});
});

module.exports = {
  getAllUsers,
  createUser,
  getEachUser,
  updateEachUser,
  deleteEachUser,
};
