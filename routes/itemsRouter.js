const express = require('express');
const router = express.Router();
const controlItem = require('../controllers/itemsControllers');
const { loginCheck } = require('../middlewares/authentication');

router.post('/create-item', loginCheck, controlItem.createItem);
router.delete('/:id', loginCheck, controlItem.deleteItemById);
router.get('/', loginCheck, controlItem.getItemByName);
router.get('/price', loginCheck, controlItem.getItemByRangePrice);
router.put('/update-item/:id', loginCheck, controlItem.updateItem);
router.get('/get-all-stock-in-and-out', loginCheck, controlItem.getAllDataInAndOut);

module.exports = router;