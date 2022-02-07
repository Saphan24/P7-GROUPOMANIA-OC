const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/new', auth, multer, commentCtrl.createComment); 
router.delete('/:id', auth, multer, commentCtrl.deleteComment);
router.get('/', auth, multer, commentCtrl.getAllComments);
router.get('/:id', auth, multer, commentCtrl.getOneComment);

module.exports = router;
