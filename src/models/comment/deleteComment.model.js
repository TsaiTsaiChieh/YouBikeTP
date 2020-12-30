const ServerErrors = require('../../helpers/ServerErrors');
const { Comment } = require('../../schemas/Comment');
const { findCommitBelongToCertainUser } = require('../../helpers/databaseEngine');

async function model(args) {
  try {
    await findCommitBelongToCertainUser(args);
    const result = await deleteComment(args);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function deleteComment(args) {
  try {
    await Comment.destroy({ where: { id: args.comment_id, uid: args.user.id } });
    return Promise.resolve({ comment: { id: args.comment_id, comment: args.comment } });
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
