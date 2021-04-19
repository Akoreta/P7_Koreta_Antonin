const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentCtrl');
const association = require('../models/association');
const auth = require('../middleware/auth');
router.post('/new/:id' ,auth, commentCtrl.newComments);
router.get('/:id' ,auth ,commentCtrl.getComment);
router.delete('/:id' ,auth ,commentCtrl.delete);



module.exports = router;
