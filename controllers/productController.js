
const { check, validationResult } = require('express-validator');
const Product = require('../models/productModel');

// GET - Récupérer tous les produits
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST - Ajouter un nouveau produit
const createProduct = async (req, res) => {
    const { name, price, description, quantity } = req.body;

    if (!name || !price || !description || !quantity) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = new Product({
            name,
            price,
            description,
            quantity
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT - Modifier un produit existant
const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Validation et récupération des données mises à jour
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du produit : ' + error.message });
    }
};

// DELETE - Supprimer un produit
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json({ message: 'Produit supprimé' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
