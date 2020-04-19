const Task = require('./task.model');

const getAllTasksByBoardId = async boardId => {
  const tasks = await Task.model.find({ boardId });

  return tasks;
};

const addTaskByBoardId = async (boardId, data) => {
  const task = await Task.model.create({ ...data, boardId });

  return task;
};
const getTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  const task = await Task.model.findOne({ boardId, id: taskId });

  return task;
};
const putTaskByBoardIdAndTaskId = async (boardId, taskId, data) => {
  const task = await Task.model.findOneAndUpdate(
    { boardId, id: taskId },
    { ...data, boardId },
    { new: true }
  );

  return task;
};

const deleteTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  const task = await Task.model.findOneAndDelete({ boardId, id: taskId });

  return task;
};

module.exports = {
  getAllTasksByBoardId,
  addTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  putTaskByBoardIdAndTaskId,
  deleteTaskByBoardIdAndTaskId
};
