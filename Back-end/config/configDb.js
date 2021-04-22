const Sequelize = require('sequelize');
const config = new Sequelize('Groupomania','GroupoAdmin','groupo',{
    dialect: 'mysql',
    host:'34.65.201.106',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging:false
});

config.authenticate()
    .then(() => console.log('Connecté à la base de donnée'))
    .catch((err) => console.log('Impossible de se connecter' , err));

module.exports = {
    Sequelize, config
}
