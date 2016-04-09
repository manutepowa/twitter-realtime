var express = require('express');
var router = express.Router();

function checkLogin(req, res, next){
	if (!req.isAuthenticated()) {
		return next();
	}
	else{
		res.redirect('/');
	}
}
/* GET users listing. */
router.get('/', checkLogin, function(req, res, next) {
  res.render('login');
});

module.exports = router;
