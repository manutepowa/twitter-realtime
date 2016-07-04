angular.module("analyticApp")
	.filter('unique', function() {
		return function(collection, keyname) {
			var output = [],
			  keys = [];


			angular.forEach(collection, function(item) {
			  var key = item[keyname];
			  if (keys.indexOf(key) === -1) {
				keys.push(key);
				output.push(item);
			  }
			});
			return output;
		};
	})
	.factory("moreInfo", function () {

		var allInfo = {};

		allInfo.getMoreInfo = function (datos, id) {
			for (var i = 0; i <= datos.length - 1; i++) {
				// console.log("hola");
				if (datos[i].id_str === id) {
					allInfo.info = datos[i];
					break;
				}
			}
		}


		return allInfo;
	})
	.controller("streamCrtl", ['$scope', 'mySocket', 'moreInfo', 'comprobarConexion', '$interval', function ($scope, mySocket, moreInfo, comprobarConexion, $interval) {
		$scope.bienvenida = "Stream";
		$scope.data = [];
		$scope.bool = 1;
		//debug
		mySocket.on('debug', function (dataDebug) {
			$scope.debug = dataDebug;
		});

		$scope.emitir = function () {
			$scope.data = [];
			$scope.media = [];
			$scope.moreInf;
			$scope.imageInfo;
			$scope.topHashtag = [];
			$scope.bool = 0;
			$scope.initTimer();
			comprobarConexion.set(true);
			$scope.loader = 1;
			mySocket.emit('inicializar');
			mySocket.emit('startStream', {
				'parametro': $scope.text
			});

			mySocket.on('twet', function (tweet) {
				// console.log(tweet.user.profile_image_url.replace("normal", "bigger"));
				$scope.realTime = tweet;

				if (tweet.retweeted_status) {
					$scope.data.push({
						id: tweet.user.screen_name,
						id_str: tweet.id_str,
						t: tweet.text,
						image: tweet.user.profile_image_url,
						zona: tweet.user.time_zone,
						url: tweet.entities.urls,
						hashtag: tweet.entities.hashtags,
						retweeted_status: tweet.retweeted_status.user.screen_name
					});
				} else {
					$scope.data.push({
						id: tweet.user.screen_name,
						id_str: tweet.id_str,
						t: tweet.text,
						image: tweet.user.profile_image_url,
						zona: tweet.user.time_zone,
						url: tweet.entities.urls,
						hashtag: tweet.entities.hashtags,
						retweeted_status: false
					});
				}

				if (tweet.entities.media) {
					$scope.media.push({
						foto: tweet.entities.media[0].media_url + ':thumb',
						url: tweet.entities.media[0].display_url
					});
				}
			});

			mySocket.on('streamHashTag', function (data) {
				$scope.topHashtag = data;
			});
		}
		$scope.openModal = function (id) {
			// moreInfo.clean();
			moreInfo.getMoreInfo($scope.data, id);
			$scope.moreInf = moreInfo.info;
			$scope.imageInfo = $scope.moreInf.image.replace("normal", "bigger");
			// console.log($scope.moreInf.hashtag.length);
			$('#modalInfoTweet').modal('show');
		}

		$scope.detener = function () {
			comprobarConexion.set(false);
			$scope.bool = 1;
			if (angular.isDefined($scope.timer)) {
				$scope.contador = 0;
				$interval.cancel($scope.timer);
			};
			mySocket.parar();
		}
		if (comprobarConexion.comprobar()) {
			$scope.detener();
		}


		$scope.initTimer = function () {
			$scope.contador = 15;
			$scope.timer = $interval(function () {
				$scope.contador--;
				if ($scope.contador == 0) {
					$scope.detener();
					// $interval.cancel($scope.timer);
				} else if ($scope.data.length !== 0) {
					$interval.cancel($scope.timer);
				}
			}, 1000);


		}



		$('[data-toggle="tooltip"]').tooltip();
		$scope.tamHeight = $(window).height() - $("#submitStream").offset().top - 70;
		$('.minHeigth').css({
			maxHeight: $scope.tamHeight,
			marginTop: '15px'
		});
		$('.maxHeigth').css({
			minHeight: $scope.tamHeight - 15,
			marginTop: '15px'
		});
		$('.topHashtagHeight').css({
			// minHeight: ($(document).height() - $("#submitStream").offset().top - 70) / 2,
			height: ($scope.tamHeight / 2) - 8
		});
		$('.topHashtagHeight').next().next().css({
			// minHeight: ($(document).height() - $("#submitStream").offset().top - 70) / 2,
			height: ($scope.tamHeight / 2) - 8
		});

		$('.pCol').css({
			"min-height": ($(window).height() - 130) + 'px'
		});
		$('.pCol form').addClass('midd');
		$('.pCol form').on('submit', function () {
			$(this).removeClass('midd');
			$(this).parent().removeClass('pCol');
			$(this).parent().css({
				"min-height": 0,
				"transition": 'all 0.2s ease'
			});
		});

	}]);
