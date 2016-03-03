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
    .directive('mapbox', [
        function() {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    callback: "="
                },
                template: '<div></div>',
                link: function(scope, element, attributes) {
                    // console.log(element.parent().parent().parent());

                    element.css({
                        "width": "100%",
                        "height": "500px",
                        "marginTop": "150px"
                            // "height": "500px"
                    });


                    L.mapbox.accessToken = 'pk.eyJ1IjoibWFudXRlcG93YSIsImEiOiJjaWxjOWtwNXUwMDY1d25tMjlkNTFxejdrIn0.tWC3IU9UmHKGVXJ-IpXyvQ';
                    var map = L.mapbox.map(element[0], 'mapbox.streets');
                    scope.callback(map);
                }
            };
        }
    ])
    .controller("mapaCrtl", function($scope, mySocket) {
		$scope.geoson = [];
        

        $scope.detener = function() {
            mySocket.emit('disconnect');
            mySocket.disconnect();
        }



        $scope.callback = function(map) {
            map.setView([0, 0], 2);
            

            $scope.emitir = function() {
            console.log($scope.text);
            mySocket.emit('start', { 'parametro': $scope.text });


            mySocket.on('twet', function(data) {
                

                // $scope.data.push({
                //     id: data.user.screen_name,
                //     id_str: data.id_str,
                //     t: data.text,
                //     image: data.user.profile_image_url,
                //     zona: data.user.time_zone
                // });
                if (data.coordinates !== null){
                	console.log($scope.geoson);
	                $scope.geoson.push({
	                	type: "Feature",
				        geometry: {
				            type: "Point",
				            coordinates: [data.coordinates.coordinates[0], data.coordinates.coordinates[1]]
				        },
				        properties: {
				          title: data.user.screen_name,
				          'marker-size': 'small',
				          'marker-symbol': 'water',
				          'marker-color': '#000'
				        }
	                });

	                L.mapbox.featureLayer($scope.geoson).addTo(map);
            	}

                // L.mapbox.addLayer($scope.geoson);
            });
        }
        };







        //      $scope.geoson = [
        //      	{
        //   "type": "Feature",
        //   "geometry": {
        //     "type": "Point",
        //     "coordinates": [125.6, 10.1]
        //   },
        //   "properties": {
        //     "title": "Dinagat Islands",
        //     'marker-size': 'small',
        //              'marker-symbol': 'water',
        //              'marker-color': '#000'
        //   }
        // },
        // {
        // "type": "Feature",
        //   "geometry": {
        //     "type": "Point",
        //     "coordinates": [-77.031952,38.913184]
        //   },
        //   "properties": {
        //     "title": "Otro",
        //     'marker-size': 'small',
        //              'marker-symbol': 'water',
        //              'marker-color': '#000'
        //   }
        // }
        //      ];
    });
