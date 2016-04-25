'use strict';

module.exports = function (stream, socket) {
	stream.on('connect', function (request) {
		console.log('!!Conectando');
	});
	stream.on('connected', function (response) {
		console.log('Conectado!!!!  SocketID:' + socket.id);
		if (response) console.log('twit connected status code : ' + response.statusCode);
	});
	stream.on('reconnect', function (request, response, connectInterval) {
		console.log('twit reconnect');
		if (response) console.log('twit response status code : ' + response.statusCode);
		console.log('twit connectInterval : ' + connectInterval);
	});
	stream.on('direct_message', function (directMsg) {
		console.log(directMsg);
	})
	stream.on('limit', function (limitMessage) {
		console.log(limitMessage);
	});

	stream.on('scrub_geo', function (scrubGeoMessage) {
		console.log(scrubGeoMessage);
	});

	stream.on('error', function (err) {
		console.log('======================ERR=========================');
		console.log(err);
	});
	stream.on('warning', function (warning) {
		console.log('======================Warning=========================');
		console.log(warning);
	});

	stream.on('disconnect', function (disconnectMessage) {
		console.log('======================disconnect=========================');
		console.log(disconnectMessage);
	});

	stream.on('user_event', function (eventMsg) {
		console.log('======================user_event=========================');
		console.log(eventMsg);
	})
}
