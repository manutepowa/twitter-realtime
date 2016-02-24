angular.module("analyticApp")
.controller("streamCrtl", function($scope){
	$scope.bienvenida = "Stream";
	$scope.conexiones = 0;
	 var socket = io.connect('http://localhost:3000');
	 

	  socket.on('new', function(data){
      	  console.log(data);
      	  $scope.conexiones = data.lenght();
      	  // $scope.$apply();
      });
});