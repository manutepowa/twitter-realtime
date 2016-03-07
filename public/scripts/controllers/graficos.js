angular.module("analyticApp")
    .factory('mySocket', function(socketFactory) {
        // var myIoSocket = io.connect('http://localhost:8080',
        //                             {'forceNew': true});
        var myIoSocket = io.connect({ 'forceNew': true });
        mySocket = socketFactory({
            ioSocket: myIoSocket
        });
        mySocket.emit('NewPlayer');
        return mySocket;
    })
    .controller("graficosCrtl", function($scope, mySocket) {
        $scope.mensaje = "Compraracion de tags";

        /**
         * Inicio emitir startGraficos
         */

        $scope.emitir = function() {
            // console.log($scope.text);
            mySocket.emit('startGraficos', { 'parametro': 'hola' });


            mySocket.on('porcentajes', function(data) {
                console.log(data);
                $scope.data = {
                    "series": ["A", "B"],
                    "data": [
                        [data.p1, data.p2]
                    ],
                    "labels": [data.param1, data.param2],
                    "colours": [{ // default
                        "fillColor": "rgba(207,100,103,1)",
                        "strokeColor": "green"
                    }],
                    "opt": {
                        scaleShowVerticalLines: true,
                        //Boolean - If there is a stroke on each bar
                        barShowStroke: false,
                        barValueSpacing: 100,

                        scaleOverride: true,
                        scaleStartValue: 0, 
                        scaleStepWidth: 10, 
                        scaleSteps: 10
                    }
                };
            });
        }
        $scope.detener = function() {
            mySocket.emit('disconnect');
            mySocket.disconnect();
        }



        // $scope.$apply(function(){
        //     console.log($scope.data.colours[0].fillColor);

        //     $scope.data.data[0][2] = 23;
        // });
    });
