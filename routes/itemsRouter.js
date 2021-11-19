const express = require('express');
const router = express.Router();
const items = require('../controllers/itemsControllers');
const uploadPhotoProduct = require('../middlewares/uploadPhotoProduct');
const { loginCheck } = require('../middlewares/authentication');

router.post('/create-item', loginCheck, items.create);

module.exports = router;