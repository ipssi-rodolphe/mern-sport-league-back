const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes accessibles à tous les utilisateurs authentifiés
router.get('/', protect, getAllProducts);
router.get('/:id', protect, getProductById);

// Routes accessibles uniquement aux administrateurs
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
