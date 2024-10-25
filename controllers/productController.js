const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const { productValidation } = require('../validation/productValidation');

// Créer un produit (seulement pour les administrateurs)
exports.createProduct = async (req, res) => {
    // Valider les données du produit
    const { error } = productValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, description, available, rentalPrice, category } = req.body;

    try {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Catégorie non valide' });
        }

        const product = new Product({
            name,
            description,
            available,
            rentalPrice,
            category
        });

        await product.save();
        res.status(201).json({ message: 'Produit créé avec succès', product });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Obtenir tous les produits
exports.getAllProducts = async (req, res) => {
    const { name, available, rentalPriceMin, rentalPriceMax, category } = req.query;

    try {
        // Créer un objet de filtre
        let filter = {};

        // Filtrer par nom (insensible à la casse)
        if (name) {
            filter.name = { $regex: new RegExp(name, 'i') }; // recherche partielle, insensible à la casse
        }

        // Filtrer par disponibilité (vrai ou faux)
        if (available !== undefined) {
            filter.available = available === 'true'; // Convertir la chaîne en booléen
        }

        // Filtrer par fourchette de prix de location
        if (rentalPriceMin !== undefined || rentalPriceMax !== undefined) {
            filter.rentalPrice = {};
            if (rentalPriceMin !== undefined) {
                filter.rentalPrice.$gte = Number(rentalPriceMin); // prix supérieur ou égal
            }
            if (rentalPriceMax !== undefined) {
                filter.rentalPrice.$lte = Number(rentalPriceMax); // prix inférieur ou égal
            }
        }

        // Filtrer par catégorie
        if (category) {
            filter.category = category; // Assurez-vous que c'est un ID de catégorie valide
        }

        // Récupérer les produits filtrés
        const products = await Product.find(filter).populate('category', 'name');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Obtenir un produit par ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('category', 'name');
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Mettre à jour un produit (seulement pour les administrateurs)
exports.updateProduct = async (req, res) => {
    // Valider les données du produit
    const { error } = productValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { id } = req.params;
    const { name, description, available, rentalPrice, category } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            available,
            rentalPrice,
            category
        }, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit mis à jour avec succès', product });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Supprimer un produit (seulement pour les administrateurs)
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};
