const Post = require('../models/postMdl');
const Like = require('../models/likeMdl');
const likeCtrl = require('../controllers/likeCtrl');
const moment = require('moment');
const fs = require('fs');
const urlGenerator = require("uuid");
const postReg = new RegExp(/\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b/g);


exports.getAllPost = async (req, res, next) => {
    try {
        let post = [];
        let getPost = await Post.Post.findAll({order: [['date_post', 'DESC']]}).then((result) => {
            for (let i = 0; i < result.length; i++) {
                post.push({
                    post_id: result[i].post_id,
                    auteur_post: result[i].auteur_post,
                    date_post: result[i].date_post,
                    title_post: result[i].title_post,
                    description_post: result[i].description_post,
                    image_url_post: result[i].image_url_post
                })
            }
        })
        for (let i = 0; i < post.length; i++) {
            let getLike = await Like.Like.count({where: {post_id: post[i].post_id}}).then((result) => {
                post[i].countLike = result;
            })
        }
        return res.status(200).json(post);
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.getOne = (req, res, next) => {
    Post.Post.findOne({
        where: {
            post_id: req.params.id
        }
    })
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json({err}));
}

exports.getPostByPseudo = (req, res, next) => {
    Post.Post.findAll({
        where: {
            auteur_post: req.params.id
        }, order: [['date_post', 'DESC']]
    })
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(400).json({err}));
}


exports.newPost = (req, res, next) => {
    const post = JSON.parse(req.body.post);
    if (postReg.test(post.title_post) === false && postReg.test(post.description_post) === false && postReg.test(post.auteur_post) === false) {

        let url = '';
        if (req.file) {
            url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } else {
            url = null
        }
        const urlPost = urlGenerator.v4();
        const newUrl = urlPost.replace(/-/g, '');
        const date = new Date(Date.now());
        Post.Post.create(
            {

                post_id: newUrl,
                auteur_post: post.auteur_post,
                date_post: date,
                title_post: post.title_post,
                description_post: post.description_post,
                count_like: 0,
                image_url_post: url
            }
        )
            .then(() => res.status(201).json({message: "Post create!"}))
            .catch(err => res.status(400).json({message: err}));
    } else {
        console.log('Error');
        return res.status(400).json('ERROR');
    }
}

exports.editPost = (req, res, next) => {
    const post = JSON.parse(req.body.post);
    const date = new Date(Date.now()).toISOString();
    if (postReg.test(post.title_post) === false && postReg.test(post.description_post) === false) {
        Post.Post.findOne(
            {
                where: {
                    post_id: req.params.id
                }
            }
        ).then((resPost) => {
            if (req.file) {
                Post.Post.update(
                    {
                        date_post: date,
                        title_post: post.title_post,
                        description_post: post.description_post,
                        image_url_post: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    },
                    {
                        where: {post_id: req.params.id}
                    })
                    .then(() => {
                            const fileName = resPost.image_url_post.split('/images/')[1];
                            fs.unlink(`images/${fileName}`, () => {
                                console.log('Image supprimée!');
                            })
                        }
                    )
                    .catch(err => res.status(400).json(err));
            } else {
                Post.Post.update(
                    {
                        title_post: post.title_post,
                        description_post: post.description_post,
                        date_post: date
                    },
                    {where: {post_id: req.params.id}})
                    .then(() => console.log('post update'))
                    .catch(err => res.status(400).json(err));
            }
        })
            .then(() => res.status(200).json({message: 'Post update'}))
            .catch((err) => res.status(400).json(err));
    } else {
        console.log('Error');
        return res.status(400).json('error');
    }

}


exports.deletePost = (req, res, next) => {
    Post.Post.findOne({
        where: {
            post_id: req.params.id
        }
    })

        .then((response) => {
            if (response.image_url_post) {
                const fileName = response.image_url_post.split('/images/')[1];
                fs.unlink(`images/${fileName}`, () => {
                    console.log('Image supprimée!');
                })
            }
            Post.Post.destroy({
                where: {
                    post_id: req.params.id
                }
            })
                .then(() => res.status(200).json({message: 'Post supprimé'}))
                .catch((err) => res.status(400).json(err));
        }).catch((err) => res.status(400).json(err));
}
