angular.module("analyticApp")
    .controller("graficosCrtl", function($scope, mySocket) {
        $scope.mensaje = "Comparacion de tracks";
        $scope.cantidad = 0;
        $scope.nulos = 0;
        $scope.data = {
            "data": [[0,0]],
            "labels": ["Track 1","Track 2"],
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
        /**
         * Inicio emitir startGraficos
         */
        
        $scope.emitir = function() {
            $scope.data.labels[0] = $scope.text1;
            $scope.data.labels[1] = $scope.text2;
            // console.log($scope.text);
            mySocket.emit('startGraficos', { 'parametro1': $scope.text1, 
                                             'parametro2': $scope.text2 });


            mySocket.on('porcentajes', function(data) {
                // console.log(data);
                $scope.data.data[0][0] = data.p1;
                $scope.data.data[0][1] = data.p2;
                $scope.cantidad++;
            });
        }
        $scope.detener = function() {
            mySocket.emit('disconnect');
            mySocket.disconnect();
        }

        mySocket.on('nulo', function(){
            $scope.nulos++;
        })

        // $scope.$apply(function(){
        //     console.log($scope.data.colours[0].fillColor);

        //     $scope.data.data[0][2] = 23;
        // });
    });
