const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const association = require('../models/association');


router.post('/register', userCtrl.register); // INSCRIPTION \\
router.post('/login', userCtrl.login); // CONNEXION \\
router.post('/', userCtrl.destroyAccount); // Suppression de compte \\
router.get('/getAll', userCtrl.getAllUser);
module.exports = router;
