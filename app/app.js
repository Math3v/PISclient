'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'ngIdle',
  'myApp.users',
  'myApp.login',
  'myApp.commisions',
  'myApp.examinations',
  'myApp.visits',
  'myApp.services',
  'myApp.directives',
  'myApp.crudModule',
  'myApp.filters'
 ])

.config(['$routeProvider', 'IdleProvider', 'KeepaliveProvider', function($routeProvider, IdleProvider, KeepaliveProvider) {
  IdleProvider.idle(60); // 1 minute idle
  IdleProvider.timeout(30); // after 30 seconds idle, time the user out
  KeepaliveProvider.interval(60); // 1 minute keep-alive ping

  $routeProvider.otherwise({redirectTo: '/login'});
}])

.constant('apiUrl', 'http://localhost:3000/api')

.run(['$rootScope', 'currentUserService', '$location', 'Idle', function($rootScope, currentUserService, $location, Idle){

  //Idle.watch();

	$rootScope.$on('$routeChangeStart', function(evnt, next) {
		console.log( "Next ", next );

    if( next.hasOwnProperty('$$route')
        && next.$$route.hasOwnProperty('access')
        && next.$$route.access.hasOwnProperty('requiredRoles') ) {

      var authorised = false;
      var currentUser = currentUserService.getUser();
      next.$$route.access.requiredRoles.forEach(function(role) {
        if( role == currentUser.role ) {
          authorised = true;
        }
      });

      if( authorised !== true ) {
        $location.path( '/404' );
      }
    }

	})
}])

.controller('indexController', ['currentUserService', '$scope', '$location', 'Idle', function(currentUserService, $scope, $location, Idle){

  $scope.$on('IdleTimeout', function() {
    console.log( "IdleTimeout" );
    $scope.logout();
  });  
  $scope.$on('IdleStart', function() {
    console.log( "IdleStart" );
  });  
  $scope.$on('IdleEnd', function() {
    console.log( "IdleEnd" );
  });  
  $scope.$on('IdleWarn', function() {
    console.log( "IdleWarn" );
  });  
  $scope.$on('Keepalive', function() {
    console.log( "Keepalive" );
  });
  
  $scope.$on('permissionsChanged', function() {
    $scope.currentUser = currentUserService.getUser();
  });

  $scope.currentUser = currentUserService.getUser();

  $scope.logout = function() {
    currentUserService.delUser();
    console.log( "Change to login" );
    $location.path( '/login' );
  }
}]);