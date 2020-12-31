const ServerErrors = require('../../helpers/ServerErrors');
const { Comment } = require('../../schemas/Comment');
const { findCommitBelongToCertainUser } = require('../../helpers/databaseEngine');

async function model(args) {
  try {
    await findCommitBelongToCertainUser(args); // 搜尋該評論是否存在且屬於該使用者
    const result = await updateComment(args);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

// 更新評論
async function updateComment(args) {
  try {
    await Comment.update(
      { comment: args.comment },
      { where: { id: args.comment_id, uid: args.user.id } }
    );
    return Promise.resolve({ comment: { id: args.comment_id, comment: args.comment } });
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
