const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');

const getToken = (id, login) => jwt.sign({ id, login }, JWT_SECRET_KEY);
const isPasswordValid = (password, hashed) => bcrypt.compare(password, hashed);

module.exports = { getToken, isPasswordValid };
