const Comment = require('../models/commentsMdl');
const commentReg = new RegExp(/\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b/g);

exports.newComments = (req,res,next) => {
    if(commentReg.test(req.body.comment_text) === false && commentReg.test(req.body.pseudo) === false){
        const date = new Date(Date.now());
        Comment.Comment.create({
            pseudo:req.body.pseudo,
            post_id:req.params.id,
            date_comment:date,
            comment_text:req.body.comment_text
        })
            .then(() => res.status(200).json('Post comment!'))
            .catch(err => res.status(400).json(err));
    }

    else {
        console.log('Error')
        return res.status(400).json('error')
    }

}

exports.getComment = (req, res,next) => {
    Comment.Comment.findAll({
        where:{
            post_id: req.params.id
        },
        order: [['date_comment', 'DESC']]    })
        .then((result) => res.status(200).json(result))
        .catch((err)=> res.status(400).json(err))
}

exports.delete = (req,res,next) => {
    Comment.Comment.destroy({
        where:{
            comment_id: req.body.comment_id
        }
    })
        .then(() => res.status(200).json('CommentModel delete!'))
        .catch((err)=> res.status(400).json(err));



}
