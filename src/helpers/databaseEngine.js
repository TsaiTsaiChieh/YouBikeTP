const ServerErrors = require('./ServerErrors');
const { Comment } = require('../schemas/Comment');
const ClientErrors = require('./ClientErrors');
const axios = require('axios');
const { API } = process.env;

async function findCommitBelongToCertainUser(args) {
  try {
    const result = await Comment.findOne({ where: { id: args.comment_id, uid: args.user.id }, raw: true });
    if (!result) return Promise.reject(new ClientErrors.CommentNotFound());
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
};

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
