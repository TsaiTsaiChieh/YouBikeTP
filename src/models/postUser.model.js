const ServerErrors = require('../helpers/ServerErrors');
const { User } = require('../schemas/User');
const ClientErrors = require('../helpers/ClientErrors');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.saltRounds);
const { getToken } = require('../helpers/tokenModules');

async function model(args) {
  try {
    await checkEmailIsDuplicated(args.email);
    args.password = await passwordAddSalt(args.password);
    args = getToken(args);
    const result = await createUserData(args);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function checkEmailIsDuplicated(email) {
  try {
    const result = await User.findOne({ where: { email } });
    if (result) return Promise.reject(new ClientErrors.ResourceAlreadyExist());
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

async function passwordAddSalt(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return Promise.resolve(hash);
  } catch (err) {
    return Promise.reject(new ServerErrors.BcryptModuleError(err.stack));
  }
}

async function createUserData(args) {
  try {
    const result = await User.create(args);
    const { id, name, email, token, token_expired } = result;
    return Promise.resolve({ user: { id, name, email }, token: { access_token: token, token_expired } });
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
