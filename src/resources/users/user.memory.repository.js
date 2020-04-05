const User = require('./user.model');

const USERS = [
  new User({ name: 'name 1', login: 'login 1', password: 'password1' }),
  new User({ name: 'name 2', login: 'login 2', password: 'password2' }),
  new User({ name: 'name 3', login: 'login 3', password: 'password3' })
];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return USERS;
};

const addUser = ({ name, login, password }) => {
  const user = new User({ name, login, password });
  USERS.push(user);
  return user;
};

const getUserById = id => {
  return USERS.find(item => item.id === id);
};

const putUserById = (id, { name, login, password }) => {
  const index = USERS.map(item => item.id).indexOf(id);

  if (index === -1) {
    return 'error';
  }

  USERS[index] = { ...USERS[index], name, login, password };
  return USERS[index];
};

const deleteUserById = id => {
  const index = USERS.map(item => item.id).indexOf(id);

  if (index === -1) {
    return 'error';
  }

  USERS.splice(index, 1);

  return USERS;
};

module.exports = { getAll, addUser, getUserById, putUserById, deleteUserById };
