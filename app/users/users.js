'use strict';

angular.module('myApp.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/patients', {
    templateUrl: 'users/patients.html',
    controller: 'usersCtrl',
    resolve: {
    	url: function(){ return '/APIUsers'; }
    }
  });
  $routeProvider.when('/doctors', {
    templateUrl: 'users/doctors.html',
    controller: 'usersCtrl',
    resolve: {
    	url: function(){ return '/APIUsers'; }
    }
  });
  $routeProvider.when('/admins', {
    templateUrl: 'users/admins.html',
    controller: 'usersCtrl',
    resolve: {
    	url: function(){ return '/APIUsers'; }
    }
  });
}])

.controller('usersCtrl', ['$http', 'apiUrl', '$scope', 'url', function($http, apiUrl, $scope, url) {

	$scope.loadObjects = function() {
		$http({
			method: 'GET',
			url: apiUrl+url
		}).then(function(response) {
			$scope.users = response.data;
			console.log(response.data);
		}, function(response) {
			console.log(response);
		});
	}

	$scope.toggleEdit = function(object) {
		if( typeof object.edit == 'undefined') {
			object.edit = true;
		} else {
			object.edit = object.edit ? false : true;
		}
	}

	$scope.newObject = function(role) {
		$scope.users.push({
			role: role, 
			edit: true, 
			_new: true
		});
	}

	$scope.editObject = function(object) {
		var method;
		if( object.hasOwnProperty('_new') && object._new === true ) {
			method = 'POST';
		} else {
			method = 'PUT';
		}

		delete object._new;
		delete object.edit;

		$http({
			method: method,
			url: apiUrl+url,
			data: object
		}).then(function(response) {
			console.log(response);
			$scope.loadObjects();
		}, function(response) {
			console.log(response);
		})
	}

	$scope.deleteObject = function(object) {
		$http({
			method: 'DELETE',
			url: apiUrl+url+'/'+object.id
		}).then(function(response) {
			console.log(response);
		}, function(response) {
			console.log(response);
		})
		$scope.loadObjects();
	}

	$scope.loadObjects();
}]);