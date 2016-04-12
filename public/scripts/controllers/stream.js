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
        }
        return allInfo;
    })
    .controller("streamCrtl", function($scope, mySocket, moreInfo) {
        $scope.bienvenida = "Stream";
        $scope.data = [];
        $scope.media = [];

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

                $scope.media.push({
                    foto: tweet.entities.media[0].media_url+':thumb',
                    url: tweet.entities.media[0].display_url
                }); 
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
        mySocket.on('streamHashTag',function(data){
            $scope.topHashtag = data;
        });

        $scope.detener = function() {
            mySocket.emit('disconnect');
            mySocket.disconnect();
        }







        $scope.tamHeight = $(document).height() - $("#submitStream").offset().top - 70;
        $('.minHeigth').css({
            maxHeight: $scope.tamHeight,
            marginTop: '15px'
        });

        $('.topHashtagHeight').css({
            // minHeight: ($(document).height() - $("#submitStream").offset().top - 70) / 2,
            height: $scope.tamHeight / 2
        });
        $('.topHashtagHeight').next().css({
            // minHeight: ($(document).height() - $("#submitStream").offset().top - 70) / 2,
            height: $scope.tamHeight / 2
        });

        $('.pCol').css({
            "min-height": ($(window).height() - 130) + 'px'
        });
        $('.pCol form').addClass('midd');
        $('.pCol form').on('submit', function() {
            $(this).removeClass('midd');
            $(this).parent().removeClass('pCol');
            $(this).parent().css({
                "min-height": 0,
                "transition": 'all 0.2s ease'
            });
        });
    });
