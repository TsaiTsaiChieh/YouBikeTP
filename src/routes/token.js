const express = require('express');
const router = express.Router();

// 使用者登入 -> 給 token
router.post('/', require('../controllers/user/login.controller'));
// 使用者登出 -> 刪除 token
router.delete('/', require('../controllers/user/logout.controller'));

module.exports = router;
