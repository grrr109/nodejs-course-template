const router = require('express').Router({ mergeParams: true });
const handleErrorAsync = require('../../middleware/error-handle');
const tasksService = require('./task.service');

router.route('/').get(
  handleErrorAsync(async (req, res) => {
    const tasks = await tasksService.getAllTasksByBoardId(req.params.boardId);

    res.json(tasks);
  })
);

router.route('/:id').get(
  handleErrorAsync(async (req, res) => {
    const task = await tasksService.getTaskByBoardIdAndTaskId(
      req.params.boardId,
      req.params.id
    );

    if (task) {
      res.json(task);
    } else {
      res
        .status(404)
        .json({ error: 'Cannot find task with this ID and board ID' });
    }
  })
);

router.route('/:id').delete(
  handleErrorAsync(async (req, res) => {
    const task = await tasksService.deleteTaskByBoardIdAndTaskId(
      req.params.boardId,
      req.params.id
    );

    if (task) {
      res.json(task);
    } else {
      res
        .status(404)
        .json({ error: 'Cannot find task with this ID and board ID' });
    }
  })
);

router.route('/:id').put(
  handleErrorAsync(async (req, res) => {
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
      res.json(task);
    }
  })
);

router.route('/').post(
  handleErrorAsync(async (req, res) => {
    const task = await tasksService.addTaskByBoardId(req.params.boardId, {
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    });

    res.json(task);
  })
);

module.exports = router;
