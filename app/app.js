'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.users',
  'myApp.commisions',
  'myApp.services',
  'myApp.directives'
 ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/patients'});
}]).
constant('apiUrl', 'http://localhost:3000/api');
