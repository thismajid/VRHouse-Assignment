const { UserModel } = require("../models");

const createUser = async (userData) => {
  const user = new UserModel(userData);
  return user.save();
};

const findUserById = async (id) => {
  return UserModel.findById(id);
};

const findUserByEmail = async (email) => {
  return UserModel.findOne({ email });
};

const updateUserById = async (id, updateData) => {
  return UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

const deleteUserById = async (id) => {
  return UserModel.findByIdAndDelete(id);
};

const comparePassword = async (user, password) => {
  return UserModel.isPasswordMatch(password);
};

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateUserById,
  deleteUserById,
  comparePassword,
};
