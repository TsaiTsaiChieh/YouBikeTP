const express = require('express');
const router = express.Router();

// 使用者註冊
router.post('/', require('../controllers/user/registration.controller'));

module.exports = router;
