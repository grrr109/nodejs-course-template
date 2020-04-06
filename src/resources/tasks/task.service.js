const tasksRepo = require('./task.memory.repository');

const getAllTasksByBoardId = boardId => tasksRepo.getAllTasksByBoardId(boardId);
const addTaskByBoardId = (boardIdParam, data) =>
  tasksRepo.addTaskByBoardId(boardIdParam, data);
const getTaskByBoardIdAndTaskId = (boardId, taskId) =>
  tasksRepo.getTaskByBoardIdAndTaskId(boardId, taskId);
const putTaskByBoardIdAndTaskId = (boardIdParam, taskId, data) =>
  tasksRepo.putTaskByBoardIdAndTaskId(boardIdParam, taskId, data);
const deleteTaskByBoardIdAndTaskId = (boardIdParam, taskId) =>
  tasksRepo.deleteTaskByBoardIdAndTaskId(boardIdParam, taskId);

module.exports = {
  getAllTasksByBoardId,
  addTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  putTaskByBoardIdAndTaskId,
  deleteTaskByBoardIdAndTaskId
};
