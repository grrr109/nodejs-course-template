const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const addBoard = ({ title, columns }) =>
  boardsRepo.addBoard({ title, columns });
const getBoardById = id => boardsRepo.getBoardById(id);
const putBoardById = (id, { title, columns }) =>
  boardsRepo.putBoardById(id, { title, columns });
const deleteBoardById = id => boardsRepo.deleteBoardById(id);

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  putBoardById,
  deleteBoardById
};
