const express = require('express');
const {
    createRental,
    getAllRentals,
    getRentalById,
    updateRentalStatus,
    deleteRental
} = require('../controllers/rentalController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes accessibles aux utilisateurs authentifiés
router.get('/', protect, getAllRentals);
router.get('/:id', protect, getRentalById);

// Routes protégées pour la création et la gestion des locations (admins et utilisateurs)
router.post('/', protect, createRental);
router.put('/:id', protect, admin, updateRentalStatus);
router.delete('/:id', protect, admin, deleteRental);

module.exports = router;
