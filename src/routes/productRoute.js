const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.postProduct);
router.get('/getCategoryByProductsById/:Id', productController.getCategoryByProductsById)
router.get('/', productController.getAllProduct);
router.get('/getCategoryByProducts', productController.getCategoryByProducts);
router.get('/:Id', productController.getProductById);
router.put('/', productController.updateProduct);
router.delete('/', productController.deleteProduct);
router.get('/getProductByCategoryId/:CategoryId', productController.getProductByCategoryId);

module.exports = router;