const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/commentCtrl');
const association = require('../models/association');

router.post('/new/:id' , commentCtrl.newComments);
router.get('/:id' , commentCtrl.getComment);
router.delete('/:id' , commentCtrl.delete);



module.exports = router;
