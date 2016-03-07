angular.module("analyticApp",[
	'chart.js',
	'ui.router',
	'btford.socket-io'
])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/inicio");

	$stateProvider
		.state('inicio', {
			url: '/inicio',
			templateUrl: 	"/views/home.html",
			controller: 	"homeCrtl"  
		})
		.state('usuarios', {
			url: '/usuarios',
			templateUrl: 	"/views/usuarios.html",
			controller: 	"usersCrtl"  
		})
		.state('stream', {
			url: '/stream',
			templateUrl: 	"/views/stream.html",
			controller: 	"streamCrtl"  
		})
		.state('mapa', {
			url: '/mapa',
			templateUrl: 	"/views/mapa.html",
			controller: 	"mapaCrtl"  
		})
		.state('Graficos', {
			url: '/graficos',
			templateUrl: 	"/views/graficos.html",
			controller: 	"graficosCrtl"  
		})
})
.controller("NavList", function ($scope, $location){
	$scope.navClass = function(page){
		var actualPage = $location.path().substring(1) || 'inicio';
		return page === actualPage ? 'active' : '';
	};
});