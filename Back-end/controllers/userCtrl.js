const User = require('../models/userMdl');
const Post = require('../models/postMdl');
const bcrypt = require('bcrypt');
const jswt = require('jsonwebtoken');
const schema = require('../models/password');
const auth = require('../middleware/auth');

exports.getAllUser = (req, res, next) => {
    User.User.findAll()
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
}

exports.register = (req, res, next) => {
    if (schema.validate(req.body.password)) {
        const date = new Date(Date.now());
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                return User.User.create({
                    email: req.body.email,
                    pseudo: req.body.pseudo,
                    password: hash,
                    isAdmin: 0,
                    dateCreation: date
                })
                    .then(() => res.status(201).json({message: 'User create!'}))
                    .catch(err => res.status(401).json(err));
            })
            .catch(err => res.status(401).json({err}));
    } else {
        return res.status(400).json();
    }
}

exports.login = (req, res, next) => {
    User.User.findOne({
        where: {
            pseudo: req.body.pseudo
        }
    })
        .then((user) => {
            if (!user) {
                return res.status(401).json({message: 'Invalid pseudo'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({message: 'Invalid password'});
                    } else {
                        return res.status(200).json({
                            userId: user.user_id,
                            pseudo: user.pseudo,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            dateCreation:user.dateCreation,
                            token: jswt.sign({userId: user.user_id}, 'TOKEN_GROUPOMANIA', {expiresIn: '24h'})
                        })
                    }
                })
                .catch((err) => res.status(400).json({err}));
        })
        .catch(err => res.status(400).json({err}));
}

exports.destroyAccount = (req, res, next) => {
    User.User.findOne({
        where: {
            user_id: req.body.user_id
        }
    })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({message: 'Invalid password! Cant delete account'});
                    } else {
                        User.User.destroy({
                            where: {
                                user_id: req.body.user_id
                            }
                        })
                            .then(() => {
                                Post.Post.destroy({
                                    where: {
                                        auteur_post: req.body.pseudo
                                    }
                                })
                                    .then(() => res.status(200).json({message: 'Account and his post delete'}))
                                    .catch((err) => res.status(400).json(err));
                            })
                            .catch(err => res.status(400).json({err}));
                    }
                })

                .catch((err) => res.status(400).json(err));
        })
        .catch((err) => res.status(400).json(err));
}

exports.getUserData = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jswt.verify(token, 'TOKEN_GROUPOMANIA');
    const userId = decodedToken.userId;
    User.User.findOne({
        where:{
            user_id:userId
        }
    })
        .then((response)=> res.status(200).json(response))
        .catch((err) => res.status(401).json(err));
}

