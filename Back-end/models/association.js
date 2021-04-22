const User = require('../models/userMdl');
const Post = require('../models/postMdl');
const Like = require('../models/likeMdl');
const Comment = require('../models/commentsMdl');
// Association PK / FK \\
Like.Like.belongsTo(Post.Post, {foreignKey: 'post_id', as: 'post_id_UrlFK', onDelete: 'CASCADE'});
Like.Like.belongsTo(User.User, {foreignKey: 'user_id', as: 'user_idFK', onDelete: 'CASCADE'});
Comment.Comment.belongsTo(Post.Post , {foreignKey: 'post_id', as: 'post_id_UrlFK', onDelete: 'CASCADE'});
