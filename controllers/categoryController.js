const Category = require('../models/categoryModel');
const { categoryValidation } = require('../validation/categoryValidation');

// Créer une catégorie (seulement pour les administrateurs)
exports.createCategory = async (req, res) => {
    // Valider les données avant création
    const { error } = categoryValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, description } = req.body;

    try {
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({ message: 'Catégorie créée avec succès', category });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Mettre à jour une catégorie (seulement pour les administrateurs)
exports.updateCategory = async (req, res) => {
    // Valider les données avant mise à jour
    const { error } = categoryValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }
        res.status(200).json({ message: 'Catégorie mise à jour avec succès', category });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Supprimer une catégorie (seulement pour les administrateurs)
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }
        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Obtenir toutes les catégories (accessible à tous les utilisateurs authentifiés)
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};
