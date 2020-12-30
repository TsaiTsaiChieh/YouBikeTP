const { UNAUTHORIZED } = require('http-status');

const model = require('../models/logout.model');

async function controller(req, res) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(UNAUTHORIZED).send('Should login');
    const token = authorization.replace('Bearer ', '');

    return res.send(await model(token));
  } catch (err) {
    return res.status(err.code).json(err.isPublic
      ? { error: err.name, devcode: err.status, message: err.message }
      : err.code);
  }
}

module.exports = controller;
