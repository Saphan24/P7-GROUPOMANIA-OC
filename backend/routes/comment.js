const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/', auth, multer, commentCtrl.createComment); 
router.delete('/:id', auth, multer, commentCtrl.deleteComment);
router.get('/:id', auth, multer, commentCtrl.getAllComments)

module.exports = router;
