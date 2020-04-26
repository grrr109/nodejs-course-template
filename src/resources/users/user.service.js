const bcrypt = require('bcrypt');
const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  const users = await User.userModel.find(
    {},
    {
      _id: 0,
      password: 0
    }
  );

  return users;
};

const addUser = async ({ name, login, password }) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.userModel.create({
    name,
    login,
    password: encryptedPassword
  });

  return user;
};

const getUserById = async id => {
  const user = await User.userModel.findOne(
    { id },
    {
      _id: 0,
      password: 0
    }
  );

  return user;
};

const putUserById = async (id, { name, login, password }) => {
  const user = await User.userModel.findOneAndUpdate(
    { id },
    { name, login, password },
    { new: true }
  );

  return user;
};

const deleteUserById = async id => {
  await Task.model.updateMany({ userId: id }, { userId: null });
  const user = await User.userModel.findOneAndDelete({ id });

  return user;
};

const getUserByLogin = async login => {
  const user = await User.userModel.findOne({ login });

  return user;
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  putUserById,
  deleteUserById,
  getUserByLogin
};
