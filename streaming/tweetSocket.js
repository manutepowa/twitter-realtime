var twit = require('twit');
var conf = require('../config/configTwitter');



module.exports = function(io) {
    var clientes = [];
    var online = 0;

    // var currentTwitStream = null;
    io.on('connection', function(socket) {
        var t = new twit(conf);
        
        clientes.push(socket.id);
        console.log('Cliente conectado!');

        /**
         * Start Stream
         */
        socket.on('startStream', function(data) {
            var topHashtag = [];
            // var stream = t.stream('statuses/filter', { 'track': data.parametro, 'language':'es'});
            var stream = t.stream('statuses/filter', { 'track': data.parametro });
            stream.on('tweet', function(tweet) {
                socket.emit('twet', tweet);
                if (tweet.entities.hashtags.length != 0) {
                    topHashtag = require('./functions/getHashtagTweet')(tweet.entities.hashtags,topHashtag);
                    socket.emit('streamHashTag', topHashtag);
                }
            });

            socket.on('disconnect', function() {
                stream.stop();
                console.log('Desconectado!!!');
            });
            stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);
            });

            stream.on('scrub_geo', function(scrubGeoMessage) {
                return console.log(scrubGeoMessage);
            });

            stream.on('warning', function(warning) {
                return console.log(warning);
            });

            stream.on('disconnect', function(disconnectMessage) {
                return console.log(disconnectMessage);
            });
        });

        /**
         * Start Mapas
         */
        socket.on('startMapa', function() {

            var stream = t.stream('statuses/filter', { 'locations': '-180,-90,180,90' });
            stream.on('tweet', function(tweet) {

                // console.log(tweet.coordinates);
                // console.log(tweet);
                socket.emit('twet', tweet);
            });


            socket.on('disconnect', function() {
                stream.stop();
                console.log('Desconectado!!!');
            });
            stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);
            });

            stream.on('scrub_geo', function(scrubGeoMessage) {
                return console.log(scrubGeoMessage);
            });

            stream.on('warning', function(warning) {
                return console.log(warning);
            });

            stream.on('disconnect', function(disconnectMessage) {
                return console.log(disconnectMessage);
            });
        });


        /**
         * Start gráficos
         */
        socket.on('startGraficos', function(data) {
            var total_1 = 0;
            var total_2 = 0;
            var total = 0;
            var parametro_1 = data.parametro1;
            var parametro_2 = data.parametro2;
            var stream = t.stream('statuses/filter', { 'track': [parametro_1, parametro_2] });
            stream.on('tweet', function(tweet) {

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
                        socket.emit('lang', {l: tweet.user.lang.substr(0,2)});
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
                        socket.emit('lang', {l: tweet.user.lang.substr(0,2)});
                    } else {
                        // console.log(tweet.entities.urls.length);
                        // console.log({
                        //     corta: tweet.entities.urls[0].url,
                        //     entera: tweet.entities.urls[0].expanded_url,
                        //     texto: tweet.entities.urls[0].display_url,
                        //     indices: tweet.entities.urls[0].indices
                        // });
                        
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


            socket.on('disconnect', function() {
                stream.stop();
                console.log('Desconectado!!!');
            });
            stream.on('limit', function(limitMessage) {
                socket.emit('limitacion', { perdidos: limitMessage.limit.track });
                return console.log(limitMessage);
            });

            stream.on('scrub_geo', function(scrubGeoMessage) {
                return console.log(scrubGeoMessage);
            });

            stream.on('warning', function(warning) {
                return console.log(warning);
            });
        });





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
