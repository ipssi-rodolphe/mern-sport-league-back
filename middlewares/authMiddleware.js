const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware pour protéger les routes
const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Chercher l'utilisateur dans la base de données
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }

            req.user = user;  // Assigner l'utilisateur trouvé à la requête
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token non valide' });
        }
    } else {
        return res.status(401).json({ message: 'Pas de token, autorisation refusée' });
    }
};

// Middleware pour les routes réservées aux administrateurs
const admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé: réservé aux administrateurs' });
    }
    next();
};

// Middleware pour les utilisateurs avec un compte accepté
const accountAccepted = (req, res, next) => {
    if (!req.user.accountAccepted) {
        return res.status(403).json({ message: 'Accès refusé: compte non accepté' });
    }
    next();
};

module.exports = { protect, admin, accountAccepted };
