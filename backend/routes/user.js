const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/myprofile/:id', auth, userCtrl.ProfilUser);
router.get('/allprofile/', auth, userCtrl.AllProfilUser);

router.put('/myprofile/:id', auth, userCtrl.modify);

router.delete('/myprofile/:id', auth, userCtrl.delete);

module.exports = router;