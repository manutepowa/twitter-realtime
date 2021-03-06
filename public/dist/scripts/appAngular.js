angular.module("analyticApp",["chart.js","ui.router","btford.socket-io","ngAnimate"]).factory("comprobarConexion",function(){var a=!1;return{comprobar:function(){return a},set:function(b){a=b}}}).factory("mySocket",["$rootScope",function(a){var b=io.connect({forceNew:!0});return{iniciar:function(){io.connect()},on:function(c,d){b.on(c,function(){var c=arguments;a.$apply(function(){d.apply(b,c)})})},emit:function(c,d,e){b.emit(c,d,function(){var c=arguments;a.$apply(function(){e&&e.apply(b,c)})})},parar:function(){b.disconnect(),b=io.connect({forceNew:!0})}}}]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/inicio"),c.hashPrefix("!"),a.state("inicio",{url:"/inicio",templateUrl:"/views/home.html",controller:"homeCrtl"}).state("usuarios",{url:"/usuarios",templateUrl:"/views/usuarios.html",controller:"usersCrtl"}).state("stream",{url:"/stream",templateUrl:"/views/stream.html",controller:"streamCrtl"}).state("mapa",{url:"/mapa",templateUrl:"/views/mapa.html",controller:"mapaCrtl"}).state("graficos",{url:"/graficos",templateUrl:"/views/graficos.html",controller:"graficosCrtl"})}]).controller("NavList",["$scope","$location",function(a,b){a.navClass=function(a){var c=b.path().substring(1)||"inicio";return a===c?"active":""}}]);