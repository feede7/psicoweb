var express = require('express');
var router = express.Router();
const auth = require('./auth')

router.get('/', function(req, res, next) {
  req.session.destroy()
  res.redirect('/');
});
module.exports = router;
