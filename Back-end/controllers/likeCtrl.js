const Like = require('../models/likeMdl');
const Post = require('../models/postMdl');


exports.hasLike = (req, res, next) => {
    Like.Like.count({
        where: {
            post_id: req.body.post_id,
            user_id: req.body.user_id
        }
    })
        .then((like) => res.status(200).json(like))
        .catch((err) => res.status(400).json({err}));
}

exports.getLike = (id) => {
    Like.Like.count({
        where: {
            post_id: id
        }
    })
        .then((result) => result)
        .catch((err) => console.log(err));
}

exports.like = (req, res, next) => {
    let likeUser = req.body.like;
    switch (likeUser) {
        case 1:
            Like.Like.create(
                {
                    user_id: req.body.user_id,
                    post_id: req.params.id
                }
            )
                .then(() => res.status(200).json({message: '+1 like'}))
                .catch(err => res.status(400).json(err));
            break;

        case 0: {
            Like.Like.destroy(
                {
                    where: {post_id: req.params.id, user_id: req.body.user_id}
                }
            )
                .then(() => res.status(200).json({message: 'Like cancel'}))
                .catch(err => res.status(400).json({err}));
            break;
        }
        default:
            res.status(400).json('error');
    }
}



