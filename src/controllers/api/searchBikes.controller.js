const { BAD_REQUEST } = require('http-status');
const ajv = require('../../helpers/ajvUtil');
const model = require('../../models/api/searchBikes.model');

async function controller(req, res) {
  const schema = {
    type: 'object',
    required: ['num'], // 可借的車位數量
    properties: {
      num: {
        type: 'number',
        default: 0
      }
    }
  };
  req.query.num = parseInt(req.query.num);
  const valid = ajv.validate(schema, req.query);
  if (!valid) return res.status(BAD_REQUEST).json(ajv.errors);
  try {
    return res.json(await model(req.query));
  } catch (err) {
    return res.status(err.code).json(err.isPublic
      ? { error: err.name, devcode: err.status, message: err.message }
      : err.code);
  }
}

module.exports = controller;
