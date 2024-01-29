const { STATUS_CODE_FORBIDDEN } = require('../utils/constants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = STATUS_CODE_FORBIDDEN;
  }
}

module.exports = Forbidden;
