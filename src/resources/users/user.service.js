const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const addUser = ({ name, login, password }) =>
  usersRepo.addUser({ name, login, password });
const getUserById = id => usersRepo.getUserById(id);
const putUserById = (id, { name, login, password }) =>
  usersRepo.putUserById(id, { name, login, password });
const deleteUserById = id => usersRepo.deleteUserById(id);

module.exports = { getAll, addUser, getUserById, putUserById, deleteUserById };
