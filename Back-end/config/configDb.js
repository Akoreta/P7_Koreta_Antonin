const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');
const config = new Sequelize(process.env.DB_NAME,process.env.ADMIN,process.env.PASSWORD,{
    dialect: process.env.DIALECT,
    host: process.env.HOST,
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
