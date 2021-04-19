const db = require('../config/configDb');
const Sequelize = require("sequelize");

const User = db.config.define('Users', {
        user_id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        email: {type: Sequelize.STRING(100), allowNull: false, unique: true},
        pseudo: {type: Sequelize.STRING(100), allowNull: false, unique: true},
        password: {type: Sequelize.STRING(250), allowNull: false},
        dateCreation:{type:Sequelize.DATE , allowNull:false},
        isAdmin: {type: Sequelize.BOOLEAN, defaultValue: 0, allowNull: false}  // 0 = false , 1 = true \\
    },
    {tableName: 'Users', timestamps: false, underscored: true},
    db.config.sync()
)

module.exports = {User, Sequelize}
