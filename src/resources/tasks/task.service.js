const tasksRepo = require('./task.memory.repository');

const getAllTasksByBoardId = boardId => tasksRepo.getAllTasksByBoardId(boardId);
const addTaskByBoardId = (boardId, data) =>
  tasksRepo.addTaskByBoardId(boardId, data);
const getTaskByBoardIdAndTaskId = (boardId, taskId) =>
  tasksRepo.getTaskByBoardIdAndTaskId(boardId, taskId);
const putTaskByBoardIdAndTaskId = (boardId, taskId, data) =>
  tasksRepo.putTaskByBoardIdAndTaskId(boardId, taskId, data);
const deleteTaskByBoardIdAndTaskId = (boardId, taskId) =>
  tasksRepo.deleteTaskByBoardIdAndTaskId(boardId, taskId);

module.exports = {
  getAllTasksByBoardId,
  addTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  putTaskByBoardIdAndTaskId,
  deleteTaskByBoardIdAndTaskId
};
