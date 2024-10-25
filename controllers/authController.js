const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation/authValidation');

// Générer un token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Générer un refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Inscription
exports.register = async (req, res) => {
    // Valider les données avant création
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { firstName, name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
        }

        user = new User({
            firstName,
            name,
            email,
            password
        });

        await user.save();
        const token = generateToken(user);

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: { id: user._id, firstName: user.firstName, name: user.name, email: user.email, role: user.role },
            token
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Générer JWT et Refresh Token
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        // Sauvegarder le refresh token dans la base de données
        user.refreshToken = refreshToken;
        await user.save();

        // Envoyer les tokens à l'utilisateur
        res.json({
            message: 'Connexion réussie',
            user: { id: user._id, firstName: user.firstName, name: user.name, email: user.email, role: user.role },
            token,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Refresh token
exports.refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(401).json({ message: 'Token requis' });

    try {
        // Vérifier si le refresh token est valide
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        // Chercher l'utilisateur dans la base de données
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: 'Token non valide' });
        }

        // Générer un nouveau JWT
        const newToken = generateToken(user);

        res.json({
            token: newToken
        });
    } catch (err) {
        return res.status(403).json({ message: 'Token non valide', error: err.message });
    }
};

// Obtenir la liste de tous les utilisateurs (super admin seulement)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Ne pas inclure les mots de passe dans la réponse
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};

// Activer ou désactiver un compte utilisateur (admin ou super admin)
exports.toggleUserAccount = async (req, res) => {
    const { id } = req.params;
    const { accountAccepted } = req.body;  // true pour activer, false pour désactiver

    try {
        const user = await User.findByIdAndUpdate(id, { accountAccepted }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const status = accountAccepted ? 'activé' : 'désactivé';
        res.status(200).json({ message: `Compte utilisateur ${status}`, user });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de serveur', error: err.message });
    }
};
