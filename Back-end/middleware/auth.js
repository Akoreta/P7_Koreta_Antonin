const jswt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let userId;
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jswt.verify(token, 'TOKEN_GROUPOMANIA');
        const userId = decodedToken.user_id;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User Id non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error | 'Requete non authentifié'})
    }
}
