var express = require('express');
var router = express.Router();
const auth = require('./auth')

/* GET home page. */
router.get('/', auth.auth, function(req, res, next) {
  res.render('index', { pagetitle: 'Our Farm StanD' });
});

module.exports = router;
