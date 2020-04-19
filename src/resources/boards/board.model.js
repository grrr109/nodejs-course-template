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
    columns: [
      {
        _id: false,
        title: String,
        order: Number
      }
    ]
  },
  {
    versionKey: false
  }
);

const Board = {
  boardModel: mongoose.model('Board', schema)
};

module.exports = Board;
