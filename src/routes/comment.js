const express = require('express');
const router = express.Router();
const { verification } = require('../middlewares/verification');

// 增加評論且需登入
router.post('/', verification, require('../controllers/comment/addComment.controller'));
// 更新評論且需登入
router.patch('/', verification, require('../controllers/comment/updateComment.controller'));
// 刪除評論且需登入
router.delete('/', verification, require('../controllers/comment/deleteComment.controller'));

module.exports = router;
