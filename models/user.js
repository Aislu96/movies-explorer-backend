const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/Unauthorized');
const { UNAUTHORIZED_MESSAGE_ERROR_USER } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Некорректный URL',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      default: 'Мария',
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }, { runValidators: true }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized(UNAUTHORIZED_MESSAGE_ERROR_USER));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(UNAUTHORIZED_MESSAGE_ERROR_USER));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
