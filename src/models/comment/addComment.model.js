const ServerErrors = require('../../helpers/ServerErrors');
const { Comment } = require('../../schemas/Comment');
const { YouBike } = require('../../schemas/YouBike');
const ClientErrors = require('../../helpers/ClientErrors');

async function model(args) {
  try {
    await findSite(args.site_id);
    const result = await createComment(args);
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

// 搜尋增加評論的站場是否存在
async function findSite(site_id) {
  try {
    const result = await YouBike.findOne({ where: { id: site_id }, raw: true });
    if (!result) return Promise.reject(new ClientErrors.SiteNotFound());
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
};

// 增加評論
async function createComment(args) {
  try {
    const result = await Comment.create({
      site_id: args.site_id,
      uid: args.user.id,
      comment: args.comment
    });
    return Promise.resolve({ comment: { id: result.id, comment: args.comment } });
  } catch (err) {
    return Promise.reject(new ServerErrors.MySQLError(err.stack));
  }
}

module.exports = model;
