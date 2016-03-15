'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.users',
  'myApp.commisions',
  'myApp.examinations',
  'myApp.visits',
  'myApp.services',
  'myApp.directives',
  'myApp.crudModule'
 ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/patients'});
}]).
constant('apiUrl', 'http://localhost:3000/api');
