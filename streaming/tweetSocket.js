var twit = require('twit');
var conf = require('../config/configTwitter');



module.exports = function (io) {
	var clientes = [];
	var online = 0;
	var opciones = {};
	var t;
	var stream;
	var topHashtag = [];
	// var currentTwitStream = null;
	io.on('connection', function (socket) {
		console.log('connecto de nuevo');
		// var stream = t.stream('statuses/filter', opciones);


		// clientes.push(socket.id);
		socket.once('inicializar', function () {
			//Inicializo el TWIT
			console.log('Inicializando....');
			t = new twit(conf);
		});
		/**
		 * Start Stream
		 */
		socket.on('startStream', function (data) {
			topHashtag = [];
			opciones.track = data.parametro;
			// var stream = t.stream('statuses/filter', { 'track': data.parametro, 'language':'es'});
			stream = t.stream('statuses/filter', opciones);

			stream.on('tweet', function (tweet) {
				socket.emit('twet', tweet);

				if (tweet.entities.hashtags.length != 0) {
					topHashtag = require('./functions/getHashtagTweet')(tweet.entities.hashtags, topHashtag);
					socket.emit('streamHashTag', topHashtag);
				}
			});

			/**
			 * Requerimos los eventos de twitter Stream
			 * './functions/eventStream'
			 */
			require('./functions/eventStream')(stream, socket);
		});

		/**
		 * Start Mapas{ 'locations': '-180,-90,180,90' }
		 */
		socket.on('startMapa', function (data) {
			var parametro = data.parametro.toLowerCase();
			if (parametro == "all") {
				stream = t.stream('statuses/filter', {
					'locations': '-180,-90,180,90'
				});
			} else {
				stream = t.stream('statuses/filter', {
					'track': parametro
				});
			}
			// var stream = t.stream('statuses/filter', { 'track': parametro });
			// var stream = t.stream('statuses/filter', { 'locations': '-180,-90,180,90' });
			// var stream = t.stream('statuses/sample', { 'delimited': 100 });
			stream.on('tweet', function (tweet) {

				// console.log(tweet.coordinates);
				// console.log(tweet.geo);
				// console.log(tweet);
				socket.emit('twet', tweet);
			});

			/**
			 * Requerimos los eventos de twitter Stream
			 * './functions/eventStream'
			 */
			require('./functions/eventStream')(stream, socket);
		});


		/**
		 * Start gráficos
		 */
		socket.on('startGraficos', function (data) {
			var total_1 = 0;
			var total_2 = 0;
			var total = 0;
			var parametro_1 = data.parametro1.toLowerCase();
			var parametro_2 = data.parametro2.toLowerCase();


			stream = t.stream('statuses/filter', {
				'track': [parametro_1, parametro_2]
			});
			stream.on('tweet', function (tweet) {

				// console.log(tweet);
				if (tweet.text) {
					var text = tweet.text.toLowerCase();

					// console.log(text);
					if (text.indexOf(parametro_1) != -1) {
						total_1++;
						total++;

						socket.emit('extraLine', {
							follow: tweet.user.followers_count,
							friend: tweet.user.friends_count,
							tweets: tweet.user.statuses_count,
							name: tweet.user.screen_name,
							media: tweet.user.profile_image_url,
							track: parametro_1
						});
						socket.emit('lang', {
							l: tweet.user.lang.substr(0, 2)
						});
					} else if (text.indexOf(parametro_2) != -1) {
						total_2++;
						total++;

						socket.emit('extraLine', {
							follow: tweet.user.followers_count,
							friend: tweet.user.friends_count,
							tweets: tweet.user.statuses_count,
							name: tweet.user.screen_name,
							media: tweet.user.profile_image_url,
							track: parametro_2
						});
						socket.emit('lang', {
							l: tweet.user.lang.substr(0, 2)
						});
					} else {

						socket.emit('nulo');
					}

					socket.emit('porcentajes', {
						p1: (total_1 / total) * 100,
						p2: (total_2 / total) * 100,
						track1: total_1,
						track2: total_2
					});


				}
			});

			stream.on('limit', function (limitMessage) {
				socket.emit('limitacion', {
					perdidos: limitMessage.limit.track
				});
				// return console.log(limitMessage);
			});

			stream.on('scrub_geo', function (scrubGeoMessage) {
				return console.log(scrubGeoMessage);
			});

			stream.on('warning', function (warning) {
				return console.log(warning);
			});
		});

		// Desconexiones de los sockets y stream
		socket.on('disconnect', function () {
			stream.stop();
			delete stream;
			io.clients(function (error, clients) {
				if (error) throw error;
				console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
			});
			console.log('Desconectado del socket!!!');
		});


		// socket.on('parar', function() {
		//     stream.stop();
		//     // socket.emit('debug', stream);
		//     // console.log(socket);
		//     console.log('Desconectado!!!');
		//     io.clients(function(error, clients) {
		//         if (error) throw error;
		//         console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
		//     });
		// });

	});

	// io.on('connection', function (socket) {
	//   console.log(conf);
	//   socket.on('NewPlayer', function(data){
	//     online += 1;
	//     socket.broadcast.emit('nPlayers',{'numero': online});
	//     socket.emit('nPlayers',{'numero': online});
	//     console.log('Online players : ' + online);
	//   });

	//   socket.on('disconnect', function () {

	//     socket.emit('disconnected');
	//     online = online - 1;
	//     console.log('Desconectado');
	//   });
	//
}
