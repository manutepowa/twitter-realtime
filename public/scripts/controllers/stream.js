angular.module("analyticApp")
.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('http://localhost:3000');
 
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
 
  return mySocket;
})
.controller("streamCrtl", function($scope,mySocket){
	$scope.bienvenida = "Stream";
	$scope.socket = mySocket;

	$scope.$on('new', function(data){
      	  console.log(data);
      	  $scope.conexiones = data.lenght();
      	  // // $scope.$apply();
      });


    $scope.$on('$destroy', function () {
      mySocket.disconnect();
    });
	// $scope.conexiones = 0;
	//  var socket = io.connect('http://localhost:3000');
	 

	//   socket.on('new', function(data){
 //      	  console.log(data);
 //      	  $scope.conexiones = data.lenght();
 //      	  // $scope.$apply();
 //      });
});