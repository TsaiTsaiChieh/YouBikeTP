const ServerErrors = require('../helpers/ServerErrors');
const { User } = require('../schemas/User');
const ClientErrors = require('../helpers/ClientErrors');

async function model(token) {
  try {
    await findToken(token);
    await deleteToken(token);
    return Promise.resolve('Logout successful.');
  } catch (err) {
    return Promise.reject(err);
  }
}

async function findToken(token) {
  try {
    const result = await User.findOne({ where: { token } });
    if (!result) return Promise.reject(new ClientErrors.TokenNotFound());
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

async function deleteToken(token) {
  try {
    await User.update({ token: '', token_expired: '' }, { where: { token } });
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
