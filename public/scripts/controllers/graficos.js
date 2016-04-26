angular.module("analyticApp")
	.controller("graficosCrtl", function ($scope, mySocket, comprobarConexion, $filter) {
		$scope.cantidad = 0;
		$scope.nulos = 0;
		$scope.perdidos = 0;
		$scope.bool = 1;
		/**
		 * [idiomas description]
		 */

		//debug
		mySocket.on('debug', function (dataDebug) {
			$scope.debug = dataDebug;
		});

		$scope.lang = {
			"de": "alemán",
			"am": "amárico",
			"ar": "árabe",
			"hy": "armenio",
			"bn": "bengalí",
			"my": "birmano",
			"bs": "bosnio",
			"bg": "búlgaro",
			"kn": "canarés",
			"zh": "chino",
			"si": "cingalés",
			"ko": "coreano",
			"hr": "croata",
			"da": "danés",
			"dv": "divehi",
			"sk": "eslovaco",
			"sl": "esloveno",
			"es": "español",
			"et": "estonio",
			"fi": "finés",
			"fr": "francés",
			"ka": "georgiano",
			"el": "griego",
			"gu": "gujarati",
			"he": "hebreo",
			"hi": "hindi",
			"hu": "húngaro",
			"id": "indonesio",
			"en": "inglés",
			"is": "islandés",
			"it": "italiano",
			"ja": "japonés",
			"km": "jemer",
			"ck": "bkurdo",
			"lo": "laosiano",
			"lv": "letón",
			"lt": "lituano",
			"ml": "malayalam",
			"mr": "maratí",
			"nl": "neerlandés",
			"ne": "nepalí",
			"no": "noruego",
			"or": "oriya",
			"pa": "panyabí",
			"ps": "pastún",
			"fa": "persa",
			"pl": "polaco",
			"pt": "portugués",
			"ro": "rumano",
			"ru": "ruso",
			"sr": "serbio",
			"sd": "sindhi",
			"sv": "sueco",
			"tl": "tagalo",
			"th": "tailandés",
			"ta": "tamil",
			"te": "telugu",
			"bo": "tibetano",
			"tr": "turco",
			"ug": "uigur"
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

		$scope.emitir = function () {
			$scope.bool = 0;
			$scope.cantidad = 0;
			$scope.nulos = 0;
			$scope.perdidos = 0;
			$scope.track1 = 0;
			$scope.track2 = 0;
			$scope.totalIdioma = 0;
			$scope.idiomas = [];
			$scope.follow = [];
			$scope.friend = [];
			mySocket.emit('inicializar');
			$scope.data.labels[0] = $scope.text1;
			$scope.data.labels[1] = $scope.text2;
			comprobarConexion.set(true);
			// $scope.tweet.labels[0] = $scope.text1;
			// $scope.tweet.labels[1] = $scope.text2;


			mySocket.emit('startGraficos', {
				'parametro1': $scope.text1,
				'parametro2': $scope.text2
			});


			mySocket.on('porcentajes', function (data) {
				// console.log(data.p1);
				//ChartBar
				$scope.data.data[0][0] = data.p1;
				$scope.data.data[0][1] = data.p2;
				$scope.track1 = data.track1;

				$scope.track2 = data.track2;
				$scope.cantidad = $scope.track1 + $scope.track2;
			});

			mySocket.on('extraLine', function (data) {

				if (data.track == $scope.text1.toLowerCase()) {
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

					// $scope.tweet.data[0] += data.tweets;
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
					// $scope.tweet.data[1] += data.tweets;
				}
			});
			//Mostrar Lenguajes mas hablados
			mySocket.on("lang", function (lang) {
				$scope.totalIdioma++;
				$scope.existe = false;
				$scope.width = '69%';
				angular.forEach($scope.idiomas, function (value, key) {
					// console.log($scope.idiomas);
					if (value.idioma === $scope.lang[lang.l]) {
						$scope.existe = true;
						$scope.idiomas[key].cont++
							$scope.idiomas[key].porcentaje = ($scope.idiomas[key].cont / $scope.totalIdioma) * 100;
						// console.log($scope.idiomas);
					}
				});

				if (!$scope.existe) {
					$scope.idiomas.push({
						idioma: $scope.lang[lang.l],
						cont: 0,
						porcentaje: 1
					});
				}
			});
		}

		/**
		 * Detener el Socket
		 */
		$scope.detener = function () {
			$scope.bool = 1;
			comprobarConexion.set(false);
			mySocket.parar();
		}
		if (comprobarConexion.comprobar()) {

			$scope.detener();
		}


		mySocket.on('nulo', function () {
			$scope.nulos++;
		});

		mySocket.on('limitacion', function (data) {
			$scope.perdidos += data.perdidos;
		});

		/**
		 * Inicializacion de tooltip
		 * Aqui no se debería hacer
		 */
		$('[data-toggle="tooltip"]').tooltip();


	});
