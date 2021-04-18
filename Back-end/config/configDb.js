const Sequelize = require('sequelize');
const config = new Sequelize('groupomaniadb', 'groupomania', 'groupo', {
    logging: false,
    dialect: 'mysql',
    host: 'localhost',
    port: '3308'
});

module.exports = {
    Sequelize, config
}
