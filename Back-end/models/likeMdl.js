const db = require('../config/configDb');
const Sequelize = require('sequelize');

const Like = db.config.define('like_table', {
        user_id: {type: Sequelize.INTEGER, primaryKey: true},
        post_id: {type: Sequelize.STRING(50), allowNull: false, primaryKey: true}
    },
    {tableName: 'like_table', timestamps: false, underscored: true},
    db.config.sync()
)

module.exports = {
    Like, Sequelize
}
