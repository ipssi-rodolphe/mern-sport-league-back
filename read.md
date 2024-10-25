# MERN TP Product Back - Boulangerie API

## Description - Projet : Application de location de matériel sportif

Ce projet consiste à développer une application web permettant à une Ligue Sportive de gérer la location de matériel sportif pour ses adhérents, en utilisant la stack MERN (MongoDB, Express, React, Node.js). L’application offre deux rôles principaux : **adhérent** et **administrateur**.

L’adhérent peut naviguer parmi les articles disponibles pour la location, organisés par catégories sportives. L’administrateur, quant à lui, dispose d'outils de gestion pour ajouter, modifier, ou supprimer des articles, ainsi que gérer les comptes adhérents. La sécurité de l'application est assurée par un système d'authentification, avec l'option d'utiliser des JWT.

Ce projet encourage la collaboration en équipe et la maîtrise des technologies MERN, tout en permettant une évaluation des compétences techniques et communicationnelles.


---

## Fonctionnalités

## Création d’une application de location de matériel sportif

L’objectif de ce projet est de permettre à une Ligue Sportive de gérer la location de matériel sportif pour ses adhérents.

### Fonctionnalités attendues

1. **Page d’inscription et de connexion :**
   - Une page permettant aux utilisateurs de s'inscrire pour devenir adhérent.
   - Une page de connexion pour accéder aux pages suivantes.

2. **Page pour l’adhérent :**
   - Une page listant les produits disponibles pour la location, [bonus] classés par catégorie sportive (ex : football, natation, basket, etc.).
      - Chaque catégorie peut afficher des produits spécifiques comme un ballon de football, des chasubles, un bonnet de natation, etc.

3. **Page pour l’administrateur :**
   - Les mêmes pages que celles disponibles pour les adhérents.
   - Une page pour gérer les adhérents (CRUD : Create, Read, Update (bonus), Delete).
   - Une page pour gérer les produits (CRUD).

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
   git clone https://github.com/ipssi-rodolphe/mern-sport-league-back.git
   ````

2. Accédez au répertoire du projet :

   ```bash
   cd mern-sport-league-back
   ````


3. Installez les dépendances nécessaires :

   ```bash
   npm install
   ````

4. Configurez les variables d'environnement dans un fichier .env à la racine du projet. Voici un exemple de fichier .env (**Vous aviez une exemaple complète dans .env.example**):

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

Pour la documentation des end-point (NOM COLLECTION : PROJECT TP MERN LEAGUE - IPSSI - Group): https://cloudy-space-835028.postman.co/workspace/IPSSI-RODOLPHE~9da9c818-ee0c-4a44-8b75-f3b90ad5c3e7/folder/19539235-cf281e93-4515-41f3-9631-c9a89aae78b6?action=share&creator=19539235&ctx=documentation&active-environment=19539235-90f35dd4-1026-4695-bfc3-521a5d84534d 