const { BAD_REQUEST } = require('http-status');
const ajv = require('../../helpers/ajvUtil');
const model = require('../../models/user/login.model');

async function controller(req, res) {
  const now = Date.now();
  const schema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        maxLength: 64,
        format: 'email'
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 32,
        pattern: '^[a-zA-Z0-9]+$'
      }
    }
  };
  const valid = ajv.validate(schema, req.body);
  if (!valid) return res.status(BAD_REQUEST).json(ajv.errors);
  req.body.now = now;

  try {
    return res.json(await model(req.body));
  } catch (err) {
    return res.status(err.code).json(err.isPublic
      ? { error: err.name, devcode: err.status, message: err.message }
      : err.code);
  }
}

module.exports = controller;
