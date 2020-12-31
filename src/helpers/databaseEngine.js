const ServerErrors = require('./ServerErrors');
const { Comment } = require('../schemas/Comment');
const ClientErrors = require('./ClientErrors');
const axios = require('axios');
const { API } = process.env;

// 搜尋有無該評論且該評論屬於目前登入的使用者
async function findCommitBelongToCertainUser(args) {
  try {
    const result = await Comment.findOne({ where: { id: args.comment_id, uid: args.user.id }, raw: true });
    if (!result) return Promise.reject(new ClientErrors.CommentNotFound());
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
};

// 從 API 取得資料
async function getDataFromAPI() {
  try {
    const { data } = await axios.get(API);
    return Promise.resolve(data.retVal);
  } catch (err) {
    console.log(err);
    return Promise.reject(new ServerErrors.GetDataFromAPI(err.stack));
  }
}

module.exports = {
  findCommitBelongToCertainUser,
  getDataFromAPI
};
