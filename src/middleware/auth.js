const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');
const { JWT_SECRET_KEY } = require('../common/config');

const checkAuthorization = (req, res, next) => {
  const token = req.header('Authorization');
  try {
    req.user = jwt.verify(token.slice(7), JWT_SECRET_KEY);
  } catch (err) {
    res.status(UNAUTHORIZED).send({ error: getStatusText(UNAUTHORIZED) });
  }
  next();
};

module.exports = checkAuthorization;
