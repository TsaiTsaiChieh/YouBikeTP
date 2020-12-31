const crypto = require('crypto');
const expiredTime = parseInt(process.env.expiredTime);

// 取得 token，過期時間為一小時
function getToken(args) {
  const catString = args.email + args.password + args.now;
  args.token = crypto.createHash('sha256').update(catString, 'utf-8').digest('hex');
  args.token_expired = args.now + expiredTime * 1000;

  return args;
}

module.exports = {
  getToken
};
