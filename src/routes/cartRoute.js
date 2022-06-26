const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.get('/polymorphicInCart', cartController.polymorphicInCart);
router.get('/scopeInCart', cartController.scopeInCart);
router.post('/', cartController.postCart);
router.get('/getUserByCartById/:Id', cartController.getUserByCartById);
router.get('/', cartController.getAllCart);
router.get('/queryData', cartController.queryData);
router.get('/finderData', cartController.finderData);
router.get('/:Id', cartController.getCartById);
router.put('/', cartController.updateCart);
router.delete('/', cartController.deleteCart);


module.exports = router;