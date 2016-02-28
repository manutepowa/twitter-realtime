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
	$scope.data = [];
    
 
  $scope.emitir = function(){
    console.log($scope.text);
    mySocket.emit('start', {'parametro': $scope.text});
  }

  mySocket.on('twet', function(data){
       console.log(data);
  
       $scope.data.push({
          id: data.user.screen_name,
          id_str: data.id_str,
          t: data.text,
          image: data.user.profile_image_url,
          zona: data.user.time_zone
       });
  });

  $scope.detener = function(){
    mySocket.emit('disconnect');
    mySocket.disconnect();
  }
});

