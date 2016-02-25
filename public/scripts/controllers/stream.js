angular.module("analyticApp")
.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('http://localhost:3000',
                              {'forceNew': true});
 
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  mySocket.emit('NewPlayer');
  return mySocket;
})
.controller("streamCrtl", function($scope,mySocket){
	$scope.bienvenida = "Stream";
	// $scope.conexiones = 0;

	mySocket.on('nPlayers', function(data){
      	  console.log(data.numero);
      	  $scope.conexiones = data.numero;

          // mySocket.disconnect();
      	  // $scope.conexiones.$apply();
      });


    // $scope.$on('$destroy', function () {
    //   mySocket.disconnect();
    // });
	// $scope.conexiones = 0;
	//  var socket = io.connect('http://localhost:3000');
	 

	//   socket.on('new', function(data){
 //      	  console.log(data);
 //      	  $scope.conexiones = data.lenght();
 //      	  // $scope.$apply();
 //      });
});