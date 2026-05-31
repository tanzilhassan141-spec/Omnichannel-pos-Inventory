const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get API sabke liye accessible hai
router.get('/', protect, getProducts);

// Create API sirf Manager aur Admin use kar sakte hain (RBAC)
router.post('/', protect, authorize('Manager', 'System Administrator'), createProduct);

module.exports = router;