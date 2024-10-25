const express = require('express');
const { register, login, getAllUsers, toggleUserAccount } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Route pour obtenir tous les utilisateurs (super admin seulement)
router.get('/users', protect, admin, getAllUsers);
// Route pour activer/désactiver un compte utilisateur (admin ou super admin)
router.put('/users/:id/toggle', protect, admin, toggleUserAccount);

module.exports = router;
