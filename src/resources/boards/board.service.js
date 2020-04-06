const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const addBoard = data => boardsRepo.addBoard(data);
const getBoardById = id => boardsRepo.getBoardById(id);
const putBoardById = (id, data) => boardsRepo.putBoardById(id, data);
const deleteBoardById = id => boardsRepo.deleteBoardById(id);

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  putBoardById,
  deleteBoardById
};
