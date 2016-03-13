'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.patients',
  'myApp.view2'
 ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/patients'});
}]).
constant('apiUrl', 'http://localhost:3000/api');
