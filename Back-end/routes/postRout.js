const express = require('express');
const router = express.Router();
const association = require('../models/association');
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');
const multer = require('../config/multer');


router.post('/new' ,auth ,multer, postCtrl.newPost);
router.get('/' , auth,postCtrl.getAllPost);
router.get('/byPseudo/:id', auth,postCtrl.getPostByPseudo);
router.get('/getOne/:id' ,auth ,postCtrl.getOne);
router.put('/:id', auth ,multer,  postCtrl.editPost);
router.delete('/:id' ,auth ,  postCtrl.deletePost);
module.exports = router;
