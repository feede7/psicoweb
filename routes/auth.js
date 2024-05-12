// Authentication and Authorization Middleware
var auth = async function(req, res, next) {
    if (req.session && req.session.user === "amy" && req.session.admin)
      return next();
    else
      return res.redirect('/');
  };

module.exports = { auth }
