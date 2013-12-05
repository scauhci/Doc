var url = 'https://github.com/scauhci/Doc/';
var app = angular
          .module('wiki', ['ngSanitize', 'ngRoute'])
          .config(['$routeProvider',
                   function($routeProvider){
                       $routeProvider
                       .when('/:path*', {
                           templateUrl: 'wiki.html',
                           controller: 'render'
                       })
                       .otherwise({
                           redirectTo: '/wiki/Home'
                       });
                   }])
          .controller('render',
                      ['$scope', '$location', '$routeParams', '$http',
                       function render($scope, $location, $routeParams, $http){
                           var hrefReg = new RegExp(url, 'g');
                           $http
                           .get($routeParams.path + '.md')
                           .success(function(data, status, headers, config){
                               var html = marked(data);
                               html = html.replace(hrefReg, '#/');
                               $scope.content = html;
                           })
                           .error(function(data, status, headers, config){
                               if(status === 404){
                                   window.location.href = url + $routeParams.path;
                               };
                           });
                       }]);