const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 1. Fetch all products for the Home Page
router.get('/', productController.getProducts);

// 2. Fetch a SINGLE product (FIXES THE 404 ERROR)
router.get('/:id', productController.getProductById);

// 3. Admin: Create a new product
router.post('/', productController.createProduct);

// 4. Admin: Update a product
router.put('/:id', productController.updateProduct);

// 5. Admin: Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;