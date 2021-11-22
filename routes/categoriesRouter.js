const express = require('express');
const router = express.Router();
const category = require('../controllers/categoriesControllers');

router.post('/create-category', category.create);

module.exports = router;