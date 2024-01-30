const { STATUS_CODE_NOT_FOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = STATUS_CODE_NOT_FOUND;
  }
}

module.exports = NotFoundError;
