const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.route('/').get(categoryController.getCategories);

router.route('/:id').get(categoryController.getCategory);

module.exports = router;
