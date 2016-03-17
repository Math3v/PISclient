'use strict';

angular.module('myApp.crudModule', [])

.controller('crudController', ['$http', 'apiUrl', '$scope', 'url', 'obj', function($http, apiUrl, $scope, url, obj) {

	$scope.obj = obj;

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
			$scope.loadObjects();
		}, function(response) {
			console.log(response);
		})
	}

	$scope.loadObjects();
}]);