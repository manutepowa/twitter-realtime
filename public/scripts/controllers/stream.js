angular.module("analyticApp")
    .controller("streamCrtl", function($scope, mySocket) {
        $scope.bienvenida = "Stream";
        $scope.data = [];


        $scope.emitir = function() {
            console.log($scope.text);
            mySocket.emit('startStream', { 'parametro': $scope.text }); 


            mySocket.on('twet', function(data) {
                console.log(data);

                $scope.data.push({
                    id: data.user.screen_name,
                    id_str: data.id_str,
                    t: data.text,
                    image: data.user.profile_image_url,
                    zona: data.user.time_zone
                });
            });
        }

        $scope.detener = function() {
            mySocket.emit('disconnect');
            mySocket.disconnect();
        }
    });
