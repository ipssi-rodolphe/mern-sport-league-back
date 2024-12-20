const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

dotenv.config();
const app = express();

// Middleware pour activer CORS sur localhost:ClientPort 
app.use(cors({
    origin: [`http://localhost:${process.env.CLIENT_PORT}`, 'http://localhost:5173'],
    // credentials: true
}));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connecté à MongoDB');
    })
    .catch(err => {
        console.error('Erreur de connexion à MongoDB:', err);
    });

// Utilisation des routes produits
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/rentals', rentalRoutes);


// Démarrage du serveur sur le port spécifié
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
