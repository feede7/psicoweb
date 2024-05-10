var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { pagetitle: 'Our Farm Stand' });
});

module.exports = router;
