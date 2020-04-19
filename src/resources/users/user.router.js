const router = require('express').Router();
const handleErrorAsync = require('../../middleware/error-handle');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(
  handleErrorAsync(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users);
  })
);

router.route('/:id').get(
  handleErrorAsync(async (req, res) => {
    const user = await usersService.getUserById(req.params.id);

    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).json({ error: 'Cannot find user with this ID' });
    }
  })
);

router.route('/:id').delete(
  handleErrorAsync(async (req, res) => {
    const user = await usersService.deleteUserById(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Cannot find user with this ID' });
    }
  })
);

router.route('/:id').put(
  handleErrorAsync(async (req, res) => {
    const user = await usersService.putUserById(req.params.id, {
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });

    if (user === 'error') {
      res.status(404).json({ error: 'Cannot find user with this ID' });
    } else {
      res.json(User.toResponse(user));
    }
  })
);

router.route('/').post(
  handleErrorAsync(async (req, res) => {
    const user = await usersService.addUser({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });

    if (user === 'error') {
      res.status(404).json({ error: 'Cannot find user with this ID' });
    } else {
      res.json(User.toResponse(user));
    }
  })
);

module.exports = router;
