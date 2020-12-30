const ServerErrors = require('../helpers/ServerErrors');
const { User } = require('../schemas/User');
const bcrypt = require('bcrypt');
const ClientErrors = require('../helpers/ClientErrors');
const { getToken } = require('../helpers/tokenModules');

async function model(args) {
  try {
    const hash = await getPassword(args.email);
    const compareResult = await validatePasswordIsCorrect(args.password, hash);
    if (!compareResult) return Promise.reject(new ClientErrors.PasswordIsWrong());
    args = getToken(args);
    const result = await updateUserToken(args);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getPassword(email) {
  try {
    const { password } = await User.findOne({ attributes: ['password'], where: { email }, raw: true });
    return Promise.resolve(password);
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

async function validatePasswordIsCorrect(plaintextPassword, hash) {
  try {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new ServerErrors.BcryptModuleError(err.stack));
  }
}

async function updateUserToken(args) {
  try {
    const { token, token_expired } = args;
    await User.update(
      { token: args.token, token_expired: args.token_expired },
      { where: { email: args.email } }
    );
    return Promise.resolve({ token: { access_token: token, token_expired: token_expired } });
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
