'use strict';

var mongoose = require('../config/mongoose/index');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: 	String,
	userID: 	String
});

module.exports = mongoose.model('User',UserSchema);