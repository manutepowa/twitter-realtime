angular.module("analyticApp", [
        'chart.js',
        'ui.router',
        'btford.socket-io'
    ])
    .factory('mySocket', function(socketFactory) {
        // var myIoSocket = io.connect('http://localhost:8080',
        //                             {'forceNew': true});
        var myIoSocket = io.connect({ 'forceNew': true });
        mySocket = socketFactory({
            ioSocket: myIoSocket
        });
        mySocket.emit('NewPlayer');
        return mySocket;
    })
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/inicio");
        $locationProvider.hashPrefix('!');
        $stateProvider
            .state('inicio', {
                url: '/inicio',
                templateUrl: "/views/home.html",
                controller: "homeCrtl"
            })
            .state('usuarios', {
                url: '/usuarios',
                templateUrl: "/views/usuarios.html",
                controller: "usersCrtl"
            })
            .state('stream', {
                url: '/stream',
                templateUrl: "/views/stream.html",
                controller: "streamCrtl"
            })
            .state('mapa', {
                url: '/mapa',
                templateUrl: "/views/mapa.html",
                controller: "mapaCrtl"
            })
            .state('graficos', {
                url: '/graficos',
                templateUrl: "/views/graficos.html",
                controller: "graficosCrtl"
            })



    })
    .controller("NavList", function($scope, $location) {
        $scope.navClass = function(page) {
            var actualPage = $location.path().substring(1) || 'inicio';
            return page === actualPage ? 'active' : '';
        };
    });
