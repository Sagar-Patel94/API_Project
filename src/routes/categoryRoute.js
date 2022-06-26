const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.post('/', categoryController.postCategory);
router.get('/', categoryController.getCategoryList);
router.get('/getProductsByCategory', categoryController.getProductsByCategory);
router.get('/getProductsByCategory/:Id', categoryController.getProductsByCategoryById);
router.get('/:Id', categoryController.getCategoryById);
router.put('/', categoryController.updateCategory);
router.delete('/', categoryController.deleteCategory);

module.exports = router;