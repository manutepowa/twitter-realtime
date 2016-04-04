angular.module("analyticApp")
    .factory("moreInfo", function() {

        var allInfo = {};


        allInfo.getMoreInfo = function(datos, id) {
            for (var i = 0; i <= datos.length - 1; i++) {
                // console.log("hola");
                if (datos[i].id_str === id) {
                    allInfo.info = datos[i];

                    break;
                }
            }
            // angular.forEach(datos, function(dato, key){
            //     console.log("hola");
            //     if (dato.id_str === id) {
            //         allInfo.info = dato;
            //         return false;
            //     }
            // });
        }
        return allInfo;
    })
    .controller("streamCrtl", function($scope, mySocket, moreInfo) {
        $scope.bienvenida = "Stream";
        $scope.data = [];



        $scope.emitir = function() {
            // console.log($scope.text);
            mySocket.emit('startStream', { 'parametro': $scope.text });


            mySocket.on('twet', function(tweet) {
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
                }
                else
                {
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
            });
        }
        $scope.openModal = function(id) {
            // moreInfo.clean();
            moreInfo.getMoreInfo($scope.data, id);
            $scope.moreInf = moreInfo.info;
            $scope.imageInfo = $scope.moreInf.image.replace("normal", "bigger");
            // console.log($scope.moreInf.hashtag.length);
            $('#modalInfoTweet').modal('show');
        }
        $scope.detener = function() {
            mySocket.emit('disconnect');
            mySocket.disconnect();
        }
    });
