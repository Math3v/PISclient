'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'users/login.html',
		controller: 'loginController'
	});
}])

.controller('loginController', ['$scope', '$http', 'apiUrl', 'currentUserService', function($scope, $http, apiUrl, currentUserService){
	$scope.login = function() {
		console.log( $scope.username );
		console.log( $scope.password );

		$http({
			method: 'GET',
			url: apiUrl+'/APIUsers/findOne',
			params: {filter:{"where":{"name": $scope.username }}}
		}).then(function(response) {
			currentUserService.setUser(response.data);
			console.log(response);
		}, function(response) {
			console.log(response);
		})
	}
}])