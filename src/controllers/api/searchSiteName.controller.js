const { BAD_REQUEST } = require('http-status');
const ajv = require('../../helpers/ajvUtil');
const model = require('../../models/api/searchSiteName.model');

async function controller(req, res) {
  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      name_en: {
        type: 'string'
      }
    },
    oneOf: [
      {
        required: ['name']
      },
      {
        required: ['name_en']
      }
    ]
  };
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
