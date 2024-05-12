var express = require('express');
var router = express.Router();
const auth = require('./auth')

router.get('/', auth.auth, function(req, res, next) {
  res.render('tips', { pagetitle: 'Tips For Living Well' });
});
module.exports = router;
