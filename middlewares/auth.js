const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { UNAUTHORIZED_MESSAGE_ERROR_AUTH } = require('../utils/constants');
require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized(UNAUTHORIZED_MESSAGE_ERROR_AUTH));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized(UNAUTHORIZED_MESSAGE_ERROR_AUTH));
    return;
  }

  req.user = payload;

  next();
};
