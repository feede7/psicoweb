var express = require('express');
var router = express.Router();
const auth = require('./auth')

router.get('/', auth.auth, function(req, res, next) {
  res.render('contact', { pagetitle: 'Contact Us' });
});
module.exports = router;
