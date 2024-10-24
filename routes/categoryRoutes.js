const express = require('express');
const { createCategory, updateCategory, deleteCategory, getAllCategories } = require('../controllers/categoryController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes accessibles par tous les utilisateurs authentifiés
router.get('/', protect, getAllCategories);

// Routes accessibles uniquement par les administrateurs
router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;
