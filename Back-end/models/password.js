const passwordValidator = require('password-validator');
const schema = new passwordValidator();

schema
    .is().min(5) // Minimum 5 caractères
    .is().max(100) // Maximum 100 caractères
    .has().uppercase() // Au moins une majuscule
    .has().lowercase()
    .has().digits(1) // Au moins 2 chiffres
    .has().not().spaces() // Pas d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'password', 'Password12', 'motdepasse', 'Motdepasse', 'azertyui']); // Blacklist

module.exports = schema;
