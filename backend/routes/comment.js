// Importation du router 'Express'
const express = require('express');
const router = express.Router();

// Middleware d'authentification pour sécuriser les routes de l'API
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Importation du controller 'comment'
const commentCtrl = require('../controllers/comment');

// routes CRUD: Create, Read, Update et Delete
router.post('/new', auth, multer, commentCtrl.createComment); // création de commentaires
router.delete('/:id', auth, multer, commentCtrl.deleteComment); // Suppression de commentaires
router.get('/', auth, multer, commentCtrl.getAllComments); // Affichage de tous les commentaires
router.get('/:id', auth, multer, commentCtrl.getOneComment); // Affichage d'un commentaire

module.exports = router;
