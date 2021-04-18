const db = require('../config/configDb');
const Sequelize = require('sequelize');
/// Models Commentaires \\
const Comment = db.config.define('comment_table', {
        comment_id: {type: Sequelize.INTEGER , primaryKey:true , autoIncrement:true}, // PK  \\
    pseudo:{type:Sequelize.STRING(50) , allowNull:false},
    date_comment:{type:Sequelize.DATE , allowNull:false},
        post_id: {type: Sequelize.STRING(50), allowNull: false},
    comment_text:{type:Sequelize.TEXT, allowNull: false}
    },
    {tableName: 'comment_table', timestamps: false, underscored: true},
    db.config.sync()
)

module.exports = {
    Comment, Sequelize
}
