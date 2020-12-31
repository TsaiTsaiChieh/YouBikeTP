const { UNAUTHORIZED } = require('http-status');
const ServerErrors = require('../helpers/ServerErrors');
const { User } = require('../schemas/User');
const ClientErrors = require('../helpers/ClientErrors');
const moment = require('moment');

async function verification(req, res, next) {
  try {
    const now = Date.now();
    const { authorization } = req.headers;
    if (!authorization) return res.status(UNAUTHORIZED).send('Should login');
    const token = authorization.replace('Bearer ', '');
    const userInfo = await findUser(token);
    await checkTokenIsExpired(now, userInfo.token_expired); // 檢查 token 是否過期
    req.user = userInfo; // 將使用者資訊代入 req
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).send(err);
  }
}

async function findUser(token) {
  try {
    const result = await User.findOne(
      {
        attributes: ['id', 'name', 'email', 'token', 'token_expired'],
        where: { token },
        raw: true
      });
    if (!result) return Promise.reject(new ClientErrors.TokenNotFound());
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

async function checkTokenIsExpired(now, token_expired) {
  const tokenExpired = moment(token_expired).valueOf();
  if (now > tokenExpired) return Promise.reject(new ClientErrors.TokenExpired());
  else return Promise.resolve();
}

module.exports = { verification };
