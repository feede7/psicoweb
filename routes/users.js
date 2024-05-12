var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login');
const auth = require('./auth')

/* GET users listing. */
router.get('/', auth.auth, function(req, res, next) {
    res.send('respond with a resource');
});

/* Login user */
router.post('/login', function (req, res, next) {
    const username = req.body.username;
    let loginResult = login(username, req.body.password);
    if (loginResult) {
        // res.render('users', {username: username});
        res.render('index', {pagetitle: username});
    }
    else {
        res.render('login', {error: true});
    }
});

module.exports = router;
