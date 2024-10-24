# MERN TP Product Back - Boulangerie API

## Description

Cette API permet de gérer les produits d'une boulangerie en fournissant des fonctionnalités CRUD (Create, Read, Update, Delete). Elle permet aux utilisateurs d'ajouter, modifier, consulter et supprimer des produits tels que des pains, viennoiseries et pâtisseries. L'API est construite avec **MongoDB**, **Express** et **Node.js**, et elle est conçue pour fonctionner avec un frontend utilisant React.

---

## Fonctionnalités

- Ajouter un produit à la boulangerie (Create).
- Consulter la liste des produits disponibles (Read).
- Mettre à jour les informations d'un produit existant (Update).
- Supprimer un produit de la liste (Delete).

---

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (https://nodejs.org/)
- **MongoDB** (localement ou via MongoDB Atlas)
- **Postman** (ou un autre outil pour tester les API)

---

## Installation

1. Clonez le dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/mern-tp-product-back.git
   ````

2. Accédez au répertoire du projet :

   ```bash
   cd mern-tp-product-back
   ````


3. Installez les dépendances nécessaires :

   ```bash
   npm install
   ````

4. Configurez les variables d'environnement dans un fichier .env à la racine du projet. Voici un exemple de fichier .env :

   ```bash
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
    PORT=3001
   ```

## Démarrage
Pour démarrer le serveur en mode développement avec nodemon (surveillance des fichiers), exécutez la commande suivante :


   ```bash
    npm run dev
   ```

Le serveur Express sera lancé sur http://localhost:3001 (ou le port défini dans votre fichier .env).

Pour la documentation des end-point : https://www.postman.com/cloudy-space-835028/ipssi-rodolphe/folder/wss44mu/project-tp-mern-product-back?action=share&creator=19539235&ctx=documentation&active-environment=19539235-90f35dd4-1026-4695-bfc3-521a5d84534d