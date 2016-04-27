'use strict';

angular.module('myApp.today', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/today', {
    templateUrl: 'today/today.html',
    controller: 'todayController',
    resolve: {
      currentUser: function(currentUserService){ return currentUserService.getUser(); }
    },
    access: {
      requiredRoles: ['admin', 'doctor']
    }
  })
}])

.controller('todayController', ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl){
  
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if( dd < 10 ) {
        dd = '0' + dd;
    } 
    if( mm < 10 ){
        mm = '0' + mm;
    } 
    $scope.today = dd+'.'+mm+'.'+yyyy;
    console.log( $scope.today );

    $http({
      method: 'GET',
      url: apiUrl + '/Visits'
    }).then(function(response) {
      $scope.visits = response.data;
    }, function(response) {
      console.log( "Error: ", response );
    });

    $http({
      method: 'GET',
      url: apiUrl + '/APIUsers'
    }).then(function(response) {
      $scope.users = [];
      for( var i = 0; i < response.data.length; i++ ) {
        $scope.users[response.data[i].id] = response.data[i];
      }
    }, function(response) {
      console.log( "Error: ", response );
    });

}]);