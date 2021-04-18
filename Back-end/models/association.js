const User = require('../models/userMdl');
const Post = require('../models/postMdl');
const Like = require('../models/likeMdl');
const Comment = require('../models/commentsMdl');

Like.Like.belongsTo(Post.Post, {foreignKey: 'post_id', as: 'post_id_UrlFK', onDelete: 'CASCADE'});
Like.Like.belongsTo(User.User, {foreignKey: 'user_id', as: 'user_idFK', onDelete: 'CASCADE'});

Comment.Comment.belongsTo(Post.Post , {foreignKey: 'post_id', as: 'post_id_UrlFK', onDelete: 'CASCADE'});

///  CREATE TABLE Post (
//     post_id VARCHAR(200) NOT  NULL,
//     PRIMARY KEY(post_id)
// );
//
// CREATE TABLE User (
//     user_id INT NOT NULL,
//     PRIMARY KEY(user_id)
// );
//
// CREATE TABLE like_table (
//     user_id INT NOT NULL,
//     post_id VARCHAR(200) NOT NULL,
//     PRIMARY KEY(user_id,post_id)
// );
//
//
// ALTER TABLE like_table
// ADD CONSTRAINT FK_like_table_User
// FOREIGN KEY (user_id) REFERENCES User(user_id);
//
// ALTER TABLE like_table
// ADD CONSTRAINT FK_like_table_Post
// FOREIGN KEY (post_id) REFERENCES Post(post_id);
