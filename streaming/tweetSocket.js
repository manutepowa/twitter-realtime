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
        socket.on('start', function(data) {

            var stream = t.stream('statuses/filter', { 'track': data.parametro });
            stream.on('tweet', function(tweet) {

                console.log(tweet.place);
                // console.log(tweet);
                socket.emit('twet', tweet);
            });


            socket.on('disconnect', function() {
                stream.stop();
                console.log('Desconectado!!!');
            });

            stream.on('limit', function(limitMessage) {
                return console.log('Error LIMIT: '+limitMessage);
            });

            stream.on('warning', function(warning) {
                return console.log('Error WARNING: '+warning);
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
