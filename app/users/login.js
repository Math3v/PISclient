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
			params: {filter:{"where":{"name": $scope.username, "password": $scope.password }}}
		}).then(function(response) {
			delete $scope.loginErrorMessage;
			currentUserService.setUser(response.data);
			console.log( "Window location assign" );
			var role = currentUserService.getUser().role;
			var url;
			if( role === 'patient' ) {
				url = '/app/?#/visits-patient';
			} else {
				url = '/app/?#/visits-doctor';
			}
			window.location.assign( url );
		}, function(response) {
			$scope.loginErrorMessage = "Invalid username or password";
			console.log(response);
		})
	}
}])