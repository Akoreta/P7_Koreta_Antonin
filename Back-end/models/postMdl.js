const db = require('../config/configDb');
const Sequelize = require('sequelize');

const Post = db.config.define('Post', {
        post_id: {type: Sequelize.STRING(50), allowNull: false, primaryKey: true, unique: true},
        auteur_post: {type: Sequelize.STRING, allowNull: false},
        date_post: {type: Sequelize.DATE, allowNull: false},
        title_post: {type: Sequelize.STRING, allowNull: false},
        description_post: {type: Sequelize.TEXT, allowNull: false},
        image_url_post: {type: Sequelize.STRING, allowNull: true},
    },
    {tableName: 'post', timestamps: false, underscored: true},
    db.config.sync()
)

module.exports = {
    Post, Sequelize
}
