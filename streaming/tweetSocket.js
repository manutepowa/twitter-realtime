var twit = require('twit');
var conf = require('../config/configTwitter');
var t = new twit(conf);


module.exports = function(io) {
    var clientes = [];
    var online = 0;
    
    // var currentTwitStream = null;
    io.on('connection', function(socket) {
        clientes.push(socket.id);
        console.log('Cliente conectado!');

        /**
         * Start Stream
         */
        socket.on('startStream', function(data) {

            var stream = t.stream('statuses/filter', { 'track': data.parametro });
            stream.on('tweet', function(tweet) {
                console.log(tweet);
                socket.emit('twet', tweet);
            });

            socket.on('disconnect', function() {
                stream.stop();
                console.log('Desconectado!!!');
            });
            stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);
            });

            stream.on('warning', function(warning) {
                return console.log('Error WARNING: ' + warning);
            });
        });

        /**
         * Start Mapas
         */
        socket.on('startMapa', function() {

            var stream = t.stream('statuses/filter', { 'locations': '-180,-90,180,90' });
            stream.on('tweet', function(tweet) {

                console.log(tweet.coordinates);
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

            stream.on('warning', function(warning) {
                return console.log('Error WARNING: ' + warning);
            });
        });


        /**
         * Start gráficos
         */
        socket.on('startGraficos', function(data) {
            var total_1 = 0;
            var total_2 = 0;
            var total = 0;
            var parametro_1 = "iphone";
            var parametro_2 = "galaxy";
            var stream = t.stream('statuses/filter', { 'track': [parametro_1, parametro_2] });
            stream.on('tweet', function(tweet) {

                if (tweet.text) {
                    var text = tweet.text.toLowerCase();
                    // console.log(text);
                    if (text.indexOf(parametro_1) != -1) {
                        total_1++;
                        total++;
                    }
                    if (text.indexOf(parametro_2) != -1) {
                        total_2++;
                        total++;
                    }

                    socket.emit('porcentajes',{
                        p1: (total_1/total)*100,
                        p2: (total_2/total)*100,
                        param1: parametro_1,
                        param2: parametro_2
                    });
                }


                // console.log(tweet);
                // socket.emit('twet', tweet);
            });


            socket.on('disconnect', function() {
                stream.stop();
                console.log('Desconectado!!!');
            });

            stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);
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
