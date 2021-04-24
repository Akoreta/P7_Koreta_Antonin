const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const likeCtrl = require('../controllers/likeCtrl');
const association = require('../models/association');

router.post('/:id',auth, likeCtrl.like);
router.post('/', auth,likeCtrl.hasLike);
module.exports = router;

