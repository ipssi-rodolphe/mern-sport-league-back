const Rental = require('../models/rentalModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const { rentalValidation } = require('../validation/rentalValidation');

// Créer une nouvelle location
exports.createRental = async (req, res) => {
    // Valider les données avant création
    const { error } = rentalValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { startDate, endDate, product, user } = req.body;

    try {
        const userExists = await User.findById(user);
        const productExists = await Product.findById(product);

        if (!userExists) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (!productExists) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Vérifier si le produit est disponible pour la location
        if (!productExists.available) {
            return res.status(400).json({ message: 'Produit non disponible pour la location' });
        }

        // Créer la location
        const rental = new Rental({
            startDate,
            endDate,
            product,
            user
        });

        // Marquer le produit comme non disponible après la création de la location
        productExists.available = false;
        await productExists.save();

        await rental.save();
        res.status(201).json({ message: 'Location créée avec succès', rental });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};


// Obtenir toutes les locations
exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.find().populate('user', 'name email').populate('product', 'name');
        res.status(200).json(rentals);
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Obtenir une location par ID
exports.getRentalById = async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await Rental.findById(id).populate('user', 'name email').populate('product', 'name');
        if (!rental) {
            return res.status(404).json({ message: 'Location non trouvée' });
        }
        res.status(200).json(rental);
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Mettre à jour le statut de retour de la location
exports.updateRentalStatus = async (req, res) => {
    const { id } = req.params;
    const { returned } = req.body;

    try {
        const rental = await Rental.findById(id).populate('product');

        if (!rental) {
            return res.status(404).json({ message: 'Location non trouvée' });
        }

        // Mettre à jour le statut de retour
        rental.returned = returned;
        rental.updatedAt = Date.now();

        // Si le produit est retourné, le rendre disponible à nouveau
        if (returned) {
            const product = await Product.findById(rental.product._id);
            product.available = true;
            await product.save();
        }

        await rental.save();
        res.status(200).json({ message: 'Statut de retour mis à jour avec succès', rental });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};


// Supprimer une location
exports.deleteRental = async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await Rental.findByIdAndDelete(id);
        if (!rental) {
            return res.status(404).json({ message: 'Location non trouvée' });
        }
        res.status(200).json({ message: 'Location supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};
