var express = require('express');
var router = express.Router();
const auth = require('./auth')

router.get('/', auth.auth, function(req, res, next) {
  res.render('about', { pagetitle: 'About Us' });
});
module.exports = router;
