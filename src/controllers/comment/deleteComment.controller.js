const { BAD_REQUEST } = require('http-status');
const ajv = require('../../helpers/ajvUtil');
const model = require('../../models/comment/deleteComment.model');

async function controller(req, res) {
  const schema = {
    type: 'object',
    required: ['comment_id'],
    properties: {
      comment_id: {
        type: 'number'
      }
    }
  };
  const valid = ajv.validate(schema, req.body);
  if (!valid) return res.status(BAD_REQUEST).json(ajv.errors);
  req.body.user = req.user;
  try {
    return res.json(await model(req.body));
  } catch (err) {
    return res.status(err.code).json(err.isPublic
      ? { error: err.name, devcode: err.status, message: err.message }
      : err.code);
  }
}

module.exports = controller;
