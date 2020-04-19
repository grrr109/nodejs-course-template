const router = require('express').Router();
const handleErrorAsync = require('../../middleware/error-handle');
const boardsService = require('./board.service');

router.route('/').get(
  handleErrorAsync(async (req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards);
  })
);

router.route('/:id').get(
  handleErrorAsync(async (req, res) => {
    const board = await boardsService.getBoardById(req.params.id);

    if (board) {
      res.json(board);
    } else {
      res.status(404).json({ error: 'Cannot find board with this ID' });
    }
  })
);

router.route('/:id').delete(
  handleErrorAsync(async (req, res) => {
    const boards = await boardsService.deleteBoardById(req.params.id);

    if (boards) {
      res.json(boards);
    } else {
      res.status(404).json({ error: 'Cannot find board with this ID' });
    }
  })
);

router.route('/:id').put(
  handleErrorAsync(async (req, res) => {
    const board = await boardsService.putBoardById(req.params.id, {
      title: req.body.title,
      columns: req.body.columns
    });

    if (board === 'error') {
      res.status(404).json({ error: 'Cannot find board with this ID' });
    } else {
      res.json(board);
    }
  })
);

router.route('/').post(
  handleErrorAsync(async (req, res) => {
    const board = await boardsService.addBoard({
      title: req.body.title,
      columns: req.body.columns
    });

    res.json(board);
  })
);

module.exports = router;
