const express = require('express');
const router = express.Router();
const itemsRouter = require('./itemsRouter');
const adminsRouter = require('./adminsRouter');
const dataStockInsRouter = require('./dataStockInsRouter');
const dataStockOutsRouter = require('./dataStockOutsRouter');

router.use('/admins', adminsRouter);
router.use('/items', itemsRouter);
router.use('/data-stock-in', dataStockInsRouter);
router.use('/data-stock-out', dataStockOutsRouter);

module.exports = router;
