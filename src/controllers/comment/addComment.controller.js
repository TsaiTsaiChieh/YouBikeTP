const { BAD_REQUEST } = require('http-status');
const ajv = require('../../helpers/ajvUtil');
const model = require('../../models/comment/addComment.model');

async function controller(req, res) {
  const schema = {
    type: 'object',
    required: ['site_id', 'comment'],
    properties: {
      site_id: { // 站場代碼
        type: 'number'
      },
      comment: {
        type: 'string',
        maxLength: 255,
        minLength: 1
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
