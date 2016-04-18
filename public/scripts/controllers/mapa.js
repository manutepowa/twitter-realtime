angular.module("analyticApp")
    .directive('mapbox', [
        function() {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    callback: "="
                },
                template: '<div></div>',
                link: function(scope, element, attributes) {
                    console.log(element.parent().parent());
                    // element.parent().parent().css({
                    //  "position": "relative" 
                    // });
                    element.css({
                        "position": "absolute",
                        "width": "100%",
                        "min-height": ($(window).height() - 70) + 'px',
                        "z-index": "100",
                        "left": "0",
                        "right": "0",
                        "margin": "0 auto"
                    });


                    L.mapbox.accessToken = 'pk.eyJ1IjoibWFudXRlcG93YSIsImEiOiJjaWxjOWtwNXUwMDY1d25tMjlkNTFxejdrIn0.tWC3IU9UmHKGVXJ-IpXyvQ';
                    var map = L.mapbox.map(element[0], 'manutepowa.pmla74e3', {
                        center: [0, 0],
                        zoom: 2
                    });
                    scope.callback(map);
                }
            };
        }
    ])
    .controller("mapaCrtl", function($scope, mySocket) {
        $scope.geoson = [];
        $scope.estructura = "";

         //debug
        mySocket.on('debug',function(dataDebug){
            $scope.debug = dataDebug;
        });
        $scope.detener = function() {
            mySocket.emit('parar');
            // mySocket.parar();
        }



        $scope.callback = function(map) {
            // map.setView([0, 0], 2);
            // console.log(map);
            // L.mapbox.featureLayer($scope.geoson).addTo(map);

            $scope.emitir = function() {
                mySocket.emit('inicializar');
                console.log($scope.text);
                mySocket.emit('startMapa', { 'parametro': $scope.text });


                mySocket.on('twet', function(data) {

                    if (data.coordinates !== null) {
                        $scope.estructura = `<div>
                                                <h3 class="text-center"><strong>${data.user.screen_name}</strong></h3>
                                                <div class="text-center">
                                                    <img src="${data.user.profile_image_url.replace("normal", "bigger")}" alt="${data.user.screen_name}" class="img-circle">
                                                </div>
                                                <div class="text-center"><span style="color:#2B333D">${data.text}</span></div>
                                                <div class="text-center">
                                                    <a href="https://twitter.com/${data.user.screen_name}/status/${data.id_str}" class="btn" target="_blank">Ver en Twitter</a>
                                                    <a href="http://maps.google.com/maps?q=&layer=c&cbll=${data.coordinates.coordinates[1]},${data.coordinates.coordinates[0]}&cbp=11,0,0,0,5" class="btn" target="_blank">Ver en Google</a>
                                                </div>
                                            </div>`



                        L.marker([data.coordinates.coordinates[1], data.coordinates.coordinates[0]], {
                         title: data.user.screen_name,
                            icon: L.mapbox.marker.icon({
                                'marker-size': 'small',
                                'marker-symbol': 'water',
                                'marker-color': '#2B333D'
                            })
                        }).bindPopup($scope.estructura).addTo(map);

                        // L.mapbox.featureLayer({
                        //     type: 'Feature',
                        //     geometry: {
                        //         type: 'Point',
                        //         coordinates: [
                        //             data.coordinates.coordinates[0],
                        //             data.coordinates.coordinates[1]
                        //         ]
                        //     },
                        //     properties: {
                        //         title: data.user.screen_name,
                        //         description: data.text,
                        //         // one can customize markers by adding simplestyle properties
                        //         // https://www.mapbox.com/guides/an-open-platform/#simplestyle
                        //         'marker-size': 'small',
                        //         'marker-color': '#FCC',
                        //         'marker-symbol': 'water'
                        //     }
                        // }).addTo(map);
                    }


                });
            }
        };



        //Ejemplo perfecto de puntos
        //  $scope.geoson = [{
        //     "type": "FeatureCollection",
        //     "features": [{
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [-30.729308780282736,
        //                 42.02170813456178
        //             ]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [
        //                 20.53041343577206, -46.55280112288892
        //             ]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [-55.08027020841837, -83.73101456556469]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [
        //                 160.01656299456954, -81.5248491615057
        //             ]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [
        //                 152.5762549135834, -39.44189835805446
        //             ]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [
        //                 88.19278900511563, -23.338483767583966
        //             ]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [
        //                 142.00911624357104, -81.59539021085948
        //             ]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [
        //                 129.67717356048524, -35.91478097252548
        //             ]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [-163.74210454523563, -44.28381075616926]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }, {
        //         "type": "Feature",
        //         "geometry": {
        //             "type": "Point",
        //             "coordinates": [
        //                 89.60865355096757, -40.66534659359604
        //             ]
        //         },
        //         "properties": {
        //             title: 'hola',
        //             'marker-size': 'small',
        //             'marker-symbol': 'water',
        //             'marker-color': '#000'
        //         }
        //     }]
        // }];
    });
