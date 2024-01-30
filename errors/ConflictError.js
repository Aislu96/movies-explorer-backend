const { STATUS_CODE_CONFLICT_ERROR } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = STATUS_CODE_CONFLICT_ERROR;
  }
}

module.exports = ConflictError;
