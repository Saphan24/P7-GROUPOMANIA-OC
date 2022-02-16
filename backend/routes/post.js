// Importation du router 'Express'
const express = require('express');
const router = express.Router();

// Middleware d'authentification pour sécuriser les routes de l'API
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Importation des controllers
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');

// routes CRUD: Create, Read, Update et Delete
router.post('/new', auth, multer, postCtrl.createPost); // création de post
router.get('/:id', auth, postCtrl.getOnePost); // Affichage d'un post
router.get('/', auth, postCtrl.getAllPosts); // Affichage de tous les posts
router.put('/:id', auth, multer, postCtrl.modifyPost);// Modification de posts
router.delete('/:id', auth, multer, postCtrl.deletePost); // Suppression de posts
router.get('/:id/comments', auth, commentCtrl.getAllComments); 

module.exports = router;