const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminsControllers');

router.post('/log-in', admin.login);

module.exports = router;
