'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/patients', {
    templateUrl: 'users/patients.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; }
    },
    access: {
      requiredRoles: ['admin', 'doctor']
    }
  });
  $routeProvider.when('/doctors', {
    templateUrl: 'users/doctors.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; }
    },
    access: {
      requiredRoles: ['admin']
    }
  });
  $routeProvider.when('/admins', {
    templateUrl: 'users/admins.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; }
    },
    access: {
      requiredRoles: ['admin']
    }
  });
}]);