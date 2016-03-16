'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.users',
  'myApp.login',
  'myApp.commisions',
  'myApp.examinations',
  'myApp.visits',
  'myApp.services',
  'myApp.directives',
  'myApp.crudModule'
 ])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/404'});
}])

.constant('apiUrl', 'http://localhost:3000/api')

.run(['$rootScope', 'currentUserService', '$location', function($rootScope, currentUserService, $location){
	$rootScope.$on('$routeChangeStart', function(evnt, next) {
		console.log( evnt );
		console.log( next );

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
}]);