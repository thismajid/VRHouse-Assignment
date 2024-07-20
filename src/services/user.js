const httpStatus = require("http-status");
const {
  Types: { ObjectId },
} = require("mongoose");

const { ApiError } = require("../utils");
const { UserRepository } = require("../repositories");

const getAllUsers = async ({
  firstname,
  lastname,
  email,
  page = 1,
  limit = 10,
}) => {
  const filter = {
    ...(firstname && { firstname: { $regex: new RegExp(firstname, "i") } }),
    ...(lastname && { lastname: { $regex: new RegExp(lastname, "i") } }),
    ...(email && { email: { $regex: new RegExp(email, "i") } }),
  };
  const pagination = { page, limit };
  return UserRepository.findAll(filter, pagination);
};

const createUser = async (userData) => {
  const existingUser = await UserRepository.findByEmail(userData.email);
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  }
  return UserRepository.create(userData);
};

const getEachUser = async (id) => {
  const user = await UserRepository.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `User with id: ${id} not found`);
  }
  return user;
};

module.exports = {
  getAllUsers,
  createUser,
  getEachUser,
};
