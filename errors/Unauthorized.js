const { STATUS_CODE_UNAUTHORIZED } = require('../utils/constants');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = STATUS_CODE_UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
