const jwt = require('jsonwebtoken');

// Middleware pour protéger les routes
const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
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
        return res.status(403).json({ message: 'Accès refusé: réservée aux administrateurs' });
    }
    next();
};

// Middleware pour les utilisateurs enregistrés et ayant un compte accepté
const accountAccepted = (req, res, next) => {
    if (!req.user.accountAccepted) {
        return res.status(403).json({ message: 'Accès refusé: compte non accepté' });
    }
    next();
};

module.exports = { protect, admin, accountAccepted };
