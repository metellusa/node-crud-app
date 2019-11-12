const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/', productController.productCreate);
router.get('/:id', productController.productDetails);
router.put('/:id', productController.productUpdate);
router.delete('/:id', productController.productDelete);

module.exports = router;