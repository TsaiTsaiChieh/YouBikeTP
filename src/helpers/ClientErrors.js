const { CONFLICT, UNAUTHORIZED } = require('http-status');

class ExtendableError extends Error {
  constructor(message, status, isPublic, code) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

class ResourceAlreadyExist extends ExtendableError {
  constructor(message, status = 409000, isPublic = true, code = CONFLICT) {
    super(message, status, isPublic, code);
  }
}

class PasswordIsWrong extends ExtendableError {
  constructor(message, status = 401000, isPublic = true, code = UNAUTHORIZED) {
    super(message, status, isPublic, code);
  }
}

module.exports = {
  ResourceAlreadyExist,
  PasswordIsWrong
};
