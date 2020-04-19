const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = async () => {
  const boards = await Board.boardModel.find({});

  return boards;
};

const addBoard = async data => {
  const board = await Board.boardModel.create(data);

  return board;
};

const getBoardById = async id => {
  const board = await Board.boardModel.findOne({ id });

  return board;
};

const putBoardById = async (id, data) => {
  const board = await Board.boardModel.findOneAndUpdate({ id }, data, {
    new: true
  });

  return board;
};

const deleteBoardById = async id => {
  await Task.model.deleteMany({ boardId: id });

  const board = await Board.boardModel.findOneAndDelete({ id });

  return board;
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  putBoardById,
  deleteBoardById
};
