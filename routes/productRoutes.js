const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');



// Route pour obtenir tous les produits
router.get('/products', getProducts);

// Route pour ajouter un nouveau produit
router.post('/products', [
    check('price').isFloat({ gt: 0 }).withMessage('Le prix doit être un nombre positif'),
], createProduct);

// Route pour mettre à jour un produit
router.put('/products/:id', updateProduct, [
    check('price').optional().isFloat({ gt: 0 }).withMessage('Le prix doit être un nombre positif'),
    check('quantity').optional().isInt({ min: 0 }).withMessage('La quantité doit être un entier positif')
]);

// Route pour supprimer un produit
router.delete('/products/:id', deleteProduct);

module.exports = router;
