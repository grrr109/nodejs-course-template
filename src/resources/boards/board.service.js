const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();
const addBoard = data => boardsRepo.addBoard(data);
const getBoardById = id => boardsRepo.getBoardById(id);
const putBoardById = (id, data) => boardsRepo.putBoardById(id, data);
const deleteBoardById = id => {
  tasksRepo.deleteAllTasksByBoardId(id);
  return boardsRepo.deleteBoardById(id);
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  putBoardById,
  deleteBoardById
};
