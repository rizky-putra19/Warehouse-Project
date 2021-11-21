const express = require('express');
const router = express.Router();
const controlStockOut = require('../controllers/dataStockOutControllers');
const { loginCheck } = require('../middlewares/authentication');

router.post('/create-stock-out', loginCheck, controlStockOut.postItemStockOut);
router.get('/get-data-stock-out', loginCheck, controlStockOut.getAllStockOutByDate);
router.get('/get-data-out-range', loginCheck, controlStockOut.getDataStockOutByRange);

module.exports = router;