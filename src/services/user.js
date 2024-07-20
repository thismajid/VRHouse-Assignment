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

module.exports = {
  getAllUsers,
};
