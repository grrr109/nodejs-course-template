const uuid = require('uuid');
const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    id: {
      type: String,
      default() {
        return uuid();
      }
    },
    name: String,
    login: String,
    password: String
  },
  {
    versionKey: false
  }
);

const User = {
  userModel: mongoose.model('User', schema),
  toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
};

module.exports = User;
