const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const association = require('../models/association');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/', auth ,userCtrl.destroyAccount);
router.get('/getUserData', auth, userCtrl.getUserData);
module.exports = router;
