'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'users/login.html',
		controller: 'loginController'
	});
}])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/404', {
		templateUrl: '404.html'
	})
}])

.controller('loginController', ['$scope', '$http', 'apiUrl', 'currentUserService', '$location', function($scope, $http, apiUrl, currentUserService, $location){
	$scope.login = function() {
		console.log( $scope.username );
		console.log( $scope.password );

		$http({
			method: 'GET',
			url: apiUrl+'/APIUsers/findOne',
			params: {filter:{"where":{"name": $scope.username }}}
		}).then(function(response) {
			currentUserService.setUser(response.data);
			$location.path( '/visits' );
			console.log(response);
		}, function(response) {
			console.log(response);
		})
	}
}])