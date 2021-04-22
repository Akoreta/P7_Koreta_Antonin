const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRout = require('./routes/userRout');
const postRout = require('./routes/postRout');
const likeRout = require('./routes/likeRout');
const commentRout = require('./routes/commentsRout');
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user', userRout);
app.use('/post', postRout);
app.use('/comment' , commentRout);
app.use('/like', likeRout);
module.exports = app;
