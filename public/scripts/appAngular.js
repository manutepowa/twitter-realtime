angular.module("analyticApp",[
	'ui.router'
])
.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/inicio");

	$stateProvider
		.state('inicio', {
			url: '/inicio',
			templateUrl: 	"/views/home.html",
			controller: 	"homeCrtl"  
		})
		.state('users', {
			url: '/users',
			templateUrl: 	"/views/users.html",
			controller: 	"usersCrtl"  
		})
		.state('stream', {
			url: '/stream',
			templateUrl: 	"/views/stream.html",
			controller: 	"streamCrtl"  
		})
})
.controller("NavList", function ($scope, $location){
	$scope.navClass = function(page){
		var actualPage = $location.path().substring(1) || 'inicio';
		return page === actualPage ? 'active' : '';
	};
});