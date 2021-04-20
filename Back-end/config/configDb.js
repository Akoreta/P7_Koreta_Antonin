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
    .catch((err) => console.log('Impossible de se connecter' , err))
// a.koreta6969@gmail.com
// ID = l-895-maprm-69 \\
// d1I0B4h0sPO9jnNg  \\
module.exports = {
    Sequelize, config
}
console.log('----------------------------------------------')
