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
	}, function(accessToken, accessTokenSecret, profile, done){

		User.findOne({userID: profile.id}, function(err, user){
			if (err) {throw(err);}

			/**
			 * Tokens para la API
			 * - Son los tokens del Usuario.
			 */
			conf.access_token = accessToken;
			conf.access_token_secret = accessTokenSecret;

			if (!err && user != null) {return done(null, user);}

			var user = new User({
				username: profile.username,
				userID:   profile.id,
				urlPhoto: profile._json.profile_image_url
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
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
}

module.exports = twitterConfig;