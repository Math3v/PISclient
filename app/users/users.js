'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/patients', {
    templateUrl: 'users/patients.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; },
      obj: function(){ return 'patient'; },
      currentUser: function(currentUserService){ return currentUserService.getUser(); }
    },
    access: {
      requiredRoles: ['admin', 'doctor']
    }
  });
  $routeProvider.when('/doctors', {
    templateUrl: 'users/doctors.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; },
      obj: function(){ return 'doctor'; },
      currentUser: function(currentUserService){ return currentUserService.getUser(); }
    },
    access: {
      requiredRoles: ['admin', 'doctor']
    }
  });
  $routeProvider.when('/admins', {
    templateUrl: 'users/admins.html',
    controller: 'crudController',
    resolve: {
    	url: function(){ return '/APIUsers'; },
      obj: function(){ return 'admin'; },
      currentUser: function(currentUserService){ return currentUserService.getUser(); }
    },
    access: {
      requiredRoles: ['admin']
    }
  });
}]);