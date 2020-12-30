const { CONFLICT, UNAUTHORIZED, NOT_FOUND } = require('http-status');

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

class TokenExpired extends ExtendableError {
  constructor(message = 'Should login again', status = 401001, isPublic = true, code = UNAUTHORIZED) {
    super(message, status, isPublic, code);
  }
}

class TokenNotFound extends ExtendableError {
  constructor(message, status = 404000, isPublic = true, code = NOT_FOUND) {
    super(message, status, isPublic, code);
  }
}

class EmailNotFound extends ExtendableError {
  constructor(message, status = 404001, isPublic = true, code = NOT_FOUND) {
    super(message, status, isPublic, code);
  }
}

class SiteNotFound extends ExtendableError {
  constructor(message, status = 404002, isPublic = true, code = NOT_FOUND) {
    super(message, status, isPublic, code);
  }
}

class CommentNotFound extends ExtendableError {
  constructor(message, status = 404003, isPublic = true, code = NOT_FOUND) {
    super(message, status, isPublic, code);
  }
}

module.exports = {
  ResourceAlreadyExist,
  PasswordIsWrong,
  TokenExpired,
  TokenNotFound,
  EmailNotFound,
  SiteNotFound,
  CommentNotFound
};
