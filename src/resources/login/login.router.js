const router = require('express').Router();
const loginService = require('./login.service');
const { FORBIDDEN, getStatusText } = require('http-status-codes');
const userService = require('../users/user.service');

router.route('/').post(async (req, res) => {
  const user = await userService.getUserByLogin(req.body.login);
  const isValid = await loginService.isPasswordValid(
    req.body.password,
    user.password
  );

  if (isValid) {
    const token = loginService.getToken(user._id, user.login);
    res.header('Authorization', token).send({ token });
  } else {
    res.status(FORBIDDEN).send({ error: getStatusText(FORBIDDEN) });
  }
});

module.exports = router;
