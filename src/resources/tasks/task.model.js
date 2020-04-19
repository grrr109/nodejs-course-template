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
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  {
    versionKey: false
  }
);

const Task = {
  model: mongoose.model('Task', schema)
};

module.exports = Task;
