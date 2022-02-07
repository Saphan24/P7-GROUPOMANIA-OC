const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');

// routes CRUD: Create, Read, Update et Delete
// Middleware d'authentification pour sécuriser les routes de l'API
router.post('/new', auth, multer, postCtrl.createPost); // création de post
router.get('/:id', auth, postCtrl.getOnePost); // Affichage d'un post
router.get('/', auth, postCtrl.getAllPosts); // Affichage de tous les posts
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);

router.get('/:id/comments', auth, commentCtrl.getAllComments);

module.exports = router;