var express = require('express');
var router = express.Router();
var login = require('../controller/authenticate/login');
const auth = require('./auth')
const authenticate = require('../public/javascripts/googleapi/authenticate')

/* GET users listing. */
router.get('/', auth.auth, function(req, res, next) {
  res.redirect('/index');
});

/* Login user */
router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let loginResult = login.login(username, req.body.password);
  if (loginResult) {
    console.log(`Trying to login for ${username}`)
    try{
      only_name = username.split('@')[0];
      await authenticate.authorize(only_name)
      console.log('SALE')
      req.session.user = only_name
      req.session.admin = true;
    } catch (err) {
      return res.render('login', {msg: 'Check credentials', error: true});
    }
    res.redirect('/index');
  }
  else {
    res.render('login', {msg: 'Error', error: true});
  }
});

module.exports = router;
