const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const {
  STATUS_CODE_CREATE, VALIDATION_MESSAGE_ERROR_PATCH_USER, VALIDATION_MESSAGE_ERROR_CREATE_USER,
  CONFLICT_MESSAGE_ERROR, NOT_FOUND_MESSAGE_ERROR_USER,
} = require('../utils/constants');
require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;
module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.patchMe = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(NOT_FOUND_MESSAGE_ERROR_USER));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest(VALIDATION_MESSAGE_ERROR_PATCH_USER));
      }
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_MESSAGE_ERROR));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((data) => {
      const { _id } = data;
      res.status(STATUS_CODE_CREATE).send({
        _id, email, name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(VALIDATION_MESSAGE_ERROR_CREATE_USER));
      }
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_MESSAGE_ERROR));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
