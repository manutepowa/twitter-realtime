angular.module("analyticApp")
    .controller("graficosCrtl", function($scope, mySocket) {
        $scope.mensaje = "Comparacion de tracks";
        $scope.cantidad = 0;
        $scope.nulos = 0;
        $scope.perdidos = 0;
        $scope.track1 = 0;
        $scope.track2 = 0;

        $scope.follow = [];
        $scope.friend = [];

        // $scope.follow = {
        //     "data": [0, 1],
        //     "labels": ["Vacio", "Vacio"],
        //     "opt": {
        //         segmentShowStroke: true,
        //         segmentStrokeColor: "#2B333D",
        //         segmentStrokeWidth: 1,
        //         percentageInnerCutout: 30, // This is 0 for Pie charts
        //         animationSteps: 20,
        //         animationEasing: "easeInOutQuad",
        //         animateRotate: true,
        //         animateScale: true
        //     }
        // };
        // $scope.friend = {
        //     "data": [0, 1],
        //     "labels": ["Vacio", "Vacio"],
        //     "opt": {
        //         segmentShowStroke: true,
        //         segmentStrokeColor: "#2B333D",
        //         segmentStrokeWidth: 1,
        //         percentageInnerCutout: 30, // This is 0 for Pie charts
        //         animationSteps: 20,
        //         animationEasing: "easeInOutQuad",
        //         animateRotate: true,
        //         animateScale: true
        //     }
        // };
        $scope.tweet = {
            "data": [0, 1],
            "labels": ["Vacio", "Vacio"],
            "colours": [{ // default
                "fillColor": "rgba(207,100,103,1)"
            }],
            "opt": {
                segmentShowStroke: true,
                segmentStrokeColor: "#2B333D",
                segmentStrokeWidth: 1,
                percentageInnerCutout: 30, // This is 0 for Pie charts
                animationSteps: 20,
                animationEasing: "easeInOutQuad",
                animateRotate: true,
                animateScale: true
            }
        };
        $scope.data = {
            "data": [
                [0, 0]
            ],
            "labels": ["Track 1", "Track 2"],
            "colours": [{ // default
                "fillColor": "#2B333D"
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
            // $scope.follow.labels[0] = $scope.text1;
            // $scope.follow.labels[1] = $scope.text2;
            // $scope.friend.labels[0] = $scope.text1;
            // $scope.friend.labels[1] = $scope.text2;
            $scope.tweet.labels[0] = $scope.text1;
            $scope.tweet.labels[1] = $scope.text2;

            // console.log($scope.text);
            mySocket.emit('startGraficos', {
                'parametro1': $scope.text1,
                'parametro2': $scope.text2
            });


            mySocket.on('porcentajes', function(data) {
                // console.log(data);
                //ChartBar
                $scope.data.data[0][0] = data.p1;
                $scope.data.data[0][1] = data.p2;
                $scope.track1 = data.track1;
                $scope.track2 = data.track2;
                $scope.cantidad = $scope.track1 + $scope.track2;
            });

            mySocket.on('extraLine', function(data) {

                if (data.track == $scope.text1) {
                    $scope.follow.push({
                        media: data.media,
                        name: data.name,
                        data: data.follow,
                        class: 'colorTrack1'
                    });
                    $scope.friend.push({
                        media: data.media,
                        name: data.name,
                        data: data.friend,
                        class: 'colorTrack1'
                    });
                    
                    // $scope.follow.data[0] += data.follow;
                    // $scope.friend.data[0] += data.friend;
                    $scope.tweet.data[0] += data.tweets;

                } else {
                    $scope.follow.push({
                        media: data.media,
                        name: data.name,
                        data: data.follow,
                        class: 'colorTrack2'
                    });
                    $scope.friend.push({
                        media: data.media,
                        name: data.name,
                        data: data.friend,
                        class: 'colorTrack2'
                    });
                    $scope.$apply();
                    // $scope.follow.data[1] += data.follow;
                    // $scope.friend.data[1] += data.friend;
                    $scope.tweet.data[1] += data.tweets;

                }
            });

        }
        $scope.detener = function() {
            mySocket.emit('disconnect');
            mySocket.disconnect();
        }

        mySocket.on('nulo', function() {
            $scope.nulos++;
        });

        mySocket.on('limitacion', function(data) {
            $scope.perdidos += data.perdidos;
        });

        // $scope.$apply(function(){
        //     console.log($scope.data.colours[0].fillColor);

        //     $scope.data.data[0][2] = 23;
        // });

        /**
         * Inicializacion de tooltip
         * Aqui no se debería hacer
         */
        $('[data-toggle="tooltip"]').tooltip();


    });
