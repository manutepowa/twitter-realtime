'use strict';

var mongoose = require('mongoose');

// var PathMongo = 'mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT || 'mongodb://localhost/analytic';
var host = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var port = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';
console.log('mongodb://'+host+':'+port);
mongoose.connect('mongodb://'+host+':'+port);
module.exports = mongoose;