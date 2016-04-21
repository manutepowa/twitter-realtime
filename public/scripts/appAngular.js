angular.module("analyticApp", [
		'chart.js',
		'ui.router',
		'btford.socket-io',
		'ngAnimate'
	])
	// .factory('mySocket', function(socketFactory) {
	//     var myIoSocket = io.connect({forceNew: true});
	//     var mySocket = socketFactory({
	//         ioSocket: myIoSocket
	//     });
	//     return mySocket;
	// })
	.factory('mySocket', function ($rootScope)
	{
		var socket = io.connect(
		{
			forceNew: true
		});
		return {
			iniciar: function ()
			{
				var socket = io.connect();
				// console.log(socket.connected);
			},
			on: function (eventName, callback)
			{
				socket.on(eventName, function ()
				{
					var args = arguments;
					$rootScope.$apply(function ()
					{
						callback.apply(socket, args);
					});
				});
			},
			emit: function (eventName, data, callback)
			{
				socket.emit(eventName, data, function ()
				{
					var args = arguments;
					$rootScope.$apply(function ()
					{
						if (callback)
						{
							callback.apply(socket, args);
						}
					});
				})
			},
			parar: function ()
			{
				socket.disconnect();
				socket = io.connect(
				{
					forceNew: true
				});
			}
		};
	})
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider)
	{
		$urlRouterProvider.otherwise("/inicio");
		$locationProvider.hashPrefix('!');
		$stateProvider
			.state('inicio',
			{
				url: '/inicio',
				templateUrl: "/views/home.html",
				controller: "homeCrtl"
			})
			.state('usuarios',
			{
				url: '/usuarios',
				templateUrl: "/views/usuarios.html",
				controller: "usersCrtl"
			})
			.state('stream',
			{
				url: '/stream',
				templateUrl: "/views/stream.html",
				controller: "streamCrtl"
			})
			.state('mapa',
			{
				url: '/mapa',
				templateUrl: "/views/mapa.html",
				controller: "mapaCrtl"
			})
			.state('graficos',
			{
				url: '/graficos',
				templateUrl: "/views/graficos.html",
				controller: "graficosCrtl"
			})



	})
	.controller("NavList", function ($scope, $location)
	{
		$scope.navClass = function (page)
		{
			var actualPage = $location.path().substring(1) || 'inicio';
			return page === actualPage ? 'active' : '';
		};
	});
