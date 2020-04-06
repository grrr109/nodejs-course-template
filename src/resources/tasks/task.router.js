const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAllTasksByBoardId(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getTaskByBoardIdAndTaskId(
    req.params.boardId,
    req.params.id
  );

  console.log('task', task);

  if (task) {
    res.json(Task.toResponse(task));
  } else {
    res
      .status(404)
      .json({ error: 'Cannot find task with this ID and board ID' });
  }
});

router.route('/:id').delete(async (req, res) => {
  const tasks = await tasksService.deleteTaskByBoardIdAndTaskId(
    req.params.boardId,
    req.params.id
  );

  if (tasks === 'error') {
    res
      .status(404)
      .json({ error: 'Cannot find task with this ID and board ID' });
  } else {
    res.json(tasks.map(Task.toResponse));
  }
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.putTaskByBoardIdAndTaskId(
    req.params.boardId,
    req.params.id,
    {
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    }
  );

  if (task === 'error') {
    res
      .status(404)
      .json({ error: 'Cannot find task with this ID and board ID' });
  } else {
    res.json(Task.toResponse(task));
  }
});

router.route('/').post(async (req, res) => {
  const task = tasksService.addTaskByBoardId(req.params.boardId, {
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.body.boardId,
    columnId: req.body.columnId
  });

  res.json(Task.toResponse(task));
});

module.exports = router;
