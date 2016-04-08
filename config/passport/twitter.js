'use strict';

var passport = require('passport');
var twitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/user');
var conf = require('../../config/configTwitter');


var twitterConfig = function(app){
	passport.use(new twitterStrategy({
		consumerKey: 	conf.consumer_key,
		consumerSecret: conf.consumer_secret,
		callbackURL: 	'/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done){
		console.log(profile);
		User.findOne({userID: profile.id}, function(err, user){
			if (err) {throw(err);}

			if (!err && user != null) {return done(null, user);}

			var user = new User({
				username: profile.username,
				userID:   profile.id
			});

			user.save(function(err){
				if (err) {throw(err);}
				done(null, user);
			});
		});
	}));

	app.get('/auth/twitter',passport.authenticate('twitter'));
	app.get('/auth/twitter/callback',passport.authenticate('twitter',{
		successRedirect: '/',
		failureRedirect: '/login'
	}));
}

module.exports = twitterConfig;