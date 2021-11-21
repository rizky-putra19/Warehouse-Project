const express = require('express');
const router = express.Router();
const controlStockIn = require('../controllers/dataStockInControllers');
const { loginCheck } = require('../middlewares/authentication');

router.post('/create-stock-in', loginCheck, controlStockIn.postItemStockIn);
router.get('/get-data-stock-in', loginCheck, controlStockIn.getAllStockInByDate);
router.get('/get-data-in-range', loginCheck, controlStockIn.getDataStockInByRange);

module.exports = router;