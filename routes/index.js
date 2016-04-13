var express = require('express');
var router = express.Router();


function checkLogin(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	else{
		res.redirect('/login');
	}
}


/* GET home page. */
router.get('/', checkLogin, function(req, res, next) {
	// console.log('==============USER==============');
	// console.log(req.user);
	// console.log('===================================');
	// console.log('==============SESSION==============');
	// console.log(req.session);
	// console.log('===================================');
	res.render('index', {
							username: req.user.username,
							id: req.user.userID,
							image: req.user.urlPhoto 
						});
});
		   			
module.exports = router;
			  				