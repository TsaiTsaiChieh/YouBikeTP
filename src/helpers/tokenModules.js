const crypto = require('crypto');
const expiredTime = parseInt(process.env.expiredTime);

function getToken(args) {
  const catString = args.email + args.password + args.now;
  args.token = crypto.createHash('sha256').update(catString, 'utf-8').digest('hex');
  args.token_expired = args.now + expiredTime * 1000;

  return args;
}

module.exports = {
  getToken
};
