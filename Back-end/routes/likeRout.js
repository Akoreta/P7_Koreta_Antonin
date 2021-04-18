const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const likeCtrl = require('../controllers/likeCtrl');
const association = require('../models/association');

router.get('/getAll', auth,likeCtrl.getLiketbl);
router.get('/:id', auth,likeCtrl.getLike);
router.post('/:id',auth, likeCtrl.like);
router.post('/', auth,likeCtrl.hasLike);
module.exports = router;

