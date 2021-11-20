const express = require('express');
const router = express.Router();
const items = require('../controllers/itemsControllers');
const uploadPhotoProduct = require('../middlewares/uploadPhoto');
const { loginCheck } = require('../middlewares/authentication');

router.post('/create-item', loginCheck, uploadPhotoProduct('cover'), items.create);

module.exports = router;