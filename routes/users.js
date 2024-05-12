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
    let loginResult = login.login(username, req.body.password);
    if (loginResult) {
        console.log(`Login for ${username}`)
        req.session.user = username;
        req.session.admin = true;
        res.render('index', {pagetitle: username});
    }
    else {
        res.render('login', {error: true});
    }
});

module.exports = router;
