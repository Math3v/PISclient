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
  })
  $routeProvider.when('/patient/:id', {
    templateUrl: 'users/patients_board.html',
    controller: 'patientsBoardController',
    resolve: {
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
}])

.controller('patientsBoardController', ['$scope', '$http', 'apiUrl', '$routeParams', function($scope, $http, apiUrl, $routeParams){
  
  $http({
    method: 'GET',
    url: apiUrl + '/APIUsers/' + $routeParams.id
  }).then(function(response) {
    $scope.user = response.data;
  }, function(response) {
    console.log( "Error: ", response );
  })

  $http({
    method: 'GET',
    url: apiUrl + '/Commissions'
  }).then(function(response) {
    $scope.commissions = response.data;
  }, function(response) {
    console.log( "Error: ", response) ;
  });

  $http({
    method: 'GET',
    url: apiUrl + '/Examinations'
  }).then(function(response) {
    $scope.examinations = response.data;
  }, function(response) {
    console.log( "Error: ", response);
  })

}]);