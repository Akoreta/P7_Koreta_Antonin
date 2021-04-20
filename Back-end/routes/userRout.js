const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const association = require('../models/association');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register); // INSCRIPTION \\
router.post('/login', userCtrl.login); // CONNEXION \\
router.post('/', auth ,userCtrl.destroyAccount); // Suppression de compte \\
router.get('/getAll',auth ,userCtrl.getAllUser);
router.get('/getUserData', auth, userCtrl.getUserData);
module.exports = router;
