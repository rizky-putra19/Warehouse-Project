const express = require('express');
const router = express.Router();
const itemsRouter = require('./itemsRouter');
const adminsRouter = require('./adminsRouter');
const dataStockInsRouter = require('./dataStockInsRouter');
const dataStockOutsRouter = require('./dataStockOutsRouter');
const categoriesRouter = require('./categoriesRouter')

router.use('/admins', adminsRouter);
router.use('/items', itemsRouter);
router.use('/data-stock-in', dataStockInsRouter);
router.use('/data-stock-out', dataStockOutsRouter);
router.use('/categorie', categoriesRouter)

module.exports = router;
