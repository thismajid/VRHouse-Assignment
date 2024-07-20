const { UserModel } = require("../models");

const create = async (userData) => {
  const user = new UserModel(userData);
  return user.save();
};

const findAll = async (query = {}, pagination = {}) => {
  return await UserModel.paginate(query, pagination);
};

const findById = async (id) => {
  return await UserModel.findById(id);
};

const findByEmail = async (email) => {
  return await UserModel.findOne({ email });
};

const updateById = async (id, updateData) => {
  return await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteById = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

const comparePassword = async (user, password) => {
  return await user.isPasswordMatch(password);
};

const findAdmin = async (role = "admin") => {
  return await UserModel.findOne({ role });
};

module.exports = {
  create,
  findAll,
  findById,
  findByEmail,
  updateById,
  deleteById,
  comparePassword,
  findAdmin,
};
