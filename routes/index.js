const express = require('express');
const router = express.Router();
const itemsRouter = require('./itemsRouter');
const adminsRouter = require('./adminsRouter')

router.use('/admins', adminsRouter);
router.use('/items', itemsRouter);

module.exports = router;
