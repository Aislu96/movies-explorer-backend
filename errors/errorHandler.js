const { STATUS_CODE_ERROR_HANDLER } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_CODE_ERROR_HANDLER;
  const message = statusCode === STATUS_CODE_ERROR_HANDLER ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
