'use strict';

var passport = require('passport');

var passportConfig = function(app){
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(user, done){
		done(null, user);
	});

	require('./twitter')(app);
};

module.exports = passportConfig;