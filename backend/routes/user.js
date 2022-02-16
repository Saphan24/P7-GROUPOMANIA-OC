// Importation du router 'Express'
const express = require('express');
const router = express.Router();

// Middleware d'authentification pour sécuriser les routes de l'API
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Importation du controller 'user'
const userCtrl = require('../controllers/user');

// Définition des routes CRUD: Create, Read, Update et Delete
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/myprofile/:id', auth, userCtrl.ProfilUser);
router.get('/allprofile/', auth, userCtrl.AllProfilUser);
router.put('/myprofile/:id', auth, userCtrl.modify);
router.delete('/myprofile/:id', auth, userCtrl.delete);

module.exports = router;