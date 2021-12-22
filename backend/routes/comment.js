const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const commentCtrl = require('../controllers/comment');

router.post('/', multer, commentCtrl.createComment); 
router.delete('/:id', multer, commentCtrl.deleteComment);

module.exports = router;
