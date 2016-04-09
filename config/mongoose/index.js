'use strict';

var mongoose = require('mongoose');
var conf = require('./config');
// var PathMongo = 'mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT || 'mongodb://localhost/analytic';
var host = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var port = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';

//Configuración para la Base de Datos en el PaaS
if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
	mongoose.connect('mongodb://'+conf.user+':'+conf.pass+'@'+host+':'+port+'/analytic');
}
else{
	mongoose.connect('mongodb://'+host+':'+port+'/analytic');
}






module.exports = mongoose;