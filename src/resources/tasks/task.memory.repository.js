const Task = require('./task.model');

let TASKS = [
  new Task({
    title: 'Title 1',
    order: 0,
    description: 'Lorem ipsum',
    userId: null,
    boardId: 'e3a0d377-e91d-47d6-bcea-34045155e238',
    columnId: null
  }),
  new Task({
    title: 'Title 2',
    order: 0,
    description: 'Lorem ipsum',
    userId: null,
    boardId: 'e3a0d377-e91d-47d6-bcea-34045155e238',
    columnId: null
  })
];

const getAllTasksByBoardId = boardId => {
  return TASKS.filter(item => item.boardId === boardId);
};

const addTaskByBoardId = (
  boardId,
  { title, order, description, userId, columnId }
) => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });

  TASKS.push(task);

  return task;
};

const getTaskByBoardIdAndTaskId = (boardId, taskId) => {
  return TASKS.filter(item => item.boardId === boardId).find(
    item => item.id === taskId
  );
};

const putTaskByBoardIdAndTaskId = (
  boardId,
  taskId,
  { title, order, description, userId, columnId }
) => {
  const index = TASKS.map(item => item.id).indexOf(taskId);

  if (index === -1) {
    return 'error';
  }

  TASKS[index] = {
    ...TASKS[index],
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };

  return TASKS[index];
};

const deleteTaskByBoardIdAndTaskId = (boardId, taskId) => {
  const index = TASKS.map(item => item.id).indexOf(taskId);

  if (index === -1) {
    return 'error';
  }

  TASKS.splice(index, 1);

  return TASKS.filter(item => item.boardId === boardId);
};

const deleteUserFromTasks = userId => {
  TASKS.forEach(item => {
    if (item.userId === userId) {
      item.userId = null;
    }
  });
};

const deleteAllTasksByBoardId = boardId => {
  TASKS = TASKS.map(item => item.boardId !== boardId);
};

module.exports = {
  getAllTasksByBoardId,
  addTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  putTaskByBoardIdAndTaskId,
  deleteTaskByBoardIdAndTaskId,
  deleteUserFromTasks,
  deleteAllTasksByBoardId
};
