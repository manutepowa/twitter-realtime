angular.module("analyticApp")
	.directive('mapbox', [
		function () {
			return {
				restrict: 'EA',
				replace: true,
				scope: {
					callback: "="
				},
				template: '<div></div>',
				link: function (scope, element, attributes) {
					element.css({
						"position": "absolute",
						"width": "100%",
						"min-height": ($(window).height() - 70) + 'px',
						"z-index": "100",
						"left": "0",
						"right": "0",
						"margin": "0 auto"
					});


					L.mapbox.accessToken = 'pk.eyJ1IjoibWFudXRlcG93YSIsImEiOiJjaWxjOWtwNXUwMDY1d25tMjlkNTFxejdrIn0.tWC3IU9UmHKGVXJ-IpXyvQ';
					var map = L.mapbox.map(element[0], 'manutepowa.pmla74e3', {
						center: [0, 0],
						zoom: 2
					});
					scope.callback(map);
				}
			};
		}
	])
	.controller("mapaCrtl", function ($scope, mySocket, comprobarConexion) {
		$scope.geoson = [];
		$scope.bool = 1;
		$scope.cuentaTweets = 0;
		$scope.cuentaTweetsCoord = 0;
		//debug
		mySocket.on('debug', function (dataDebug) {
			$scope.debug = dataDebug;
		});

		$scope.callback = function (map) {
			// map.setView([0, 0], 2);
			// console.log(map);
			// L.mapbox.featureLayer($scope.geoson).addTo(map);

			$scope.emitir = function () {
				$scope.cuentaTweets = 0;
				$scope.cuentaTweetsCoord = 0;
				$scope.estructura = "";
				$scope.bool = 0;
				mySocket.emit('inicializar');
				mySocket.emit('startMapa', { 'parametro': $scope.text });
				comprobarConexion.set(true);

				mySocket.on('twet', function (data) {
					$scope.cuentaTweets++;
					if (data.coordinates !== null) {
						$scope.estructura = `<div>
                                                <h3 class="text-center"><strong>${data.user.screen_name}</strong></h3>
                                                <div class="text-center">
                                                    <img src="${data.user.profile_image_url.replace("normal", "bigger")}" alt="${data.user.screen_name}" class="img-circle">
                                                </div>
                                                <div class="text-center"><span style="color:#2B333D">${data.text}</span></div>
                                                <div class="text-center">
                                                    <a href="https://twitter.com/${data.user.screen_name}/status/${data.id_str}" class="btn" target="_blank">Ver en Twitter</a>
                                                    <a href="http://maps.google.com/maps?q=&layer=c&cbll=${data.coordinates.coordinates[1]},${data.coordinates.coordinates[0]}&cbp=11,0,0,0,5" class="btn" target="_blank">Ver en Google</a>
                                                </div>
                                            </div>`



						L.marker([data.coordinates.coordinates[1], data.coordinates.coordinates[0]], {
							title: data.user.screen_name,
							icon: L.mapbox.marker.icon({
								'marker-size': 'small',
								'marker-symbol': 'water',
								'marker-color': '#2B333D'
							})
						}).bindPopup($scope.estructura).addTo(map);
					}


				});
			}
		};

		$scope.detener = function () {
			$scope.bool = 1;
			comprobarConexion.set(false);
			mySocket.parar();
		}
		if (comprobarConexion.comprobar()) {
			$scope.detener();
		}


		$scope.$watch('estructura', function (data) {
			if (data == "") {
				console.log('cambiooooooo porque estoy vacio!!!!!');
			} else if (data !== undefined) {
				$scope.cuentaTweetsCoord++;
				console.log('cambiooooooo!!!!!');
				console.log(data);
			}

		});

	});
