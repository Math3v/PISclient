'use strict';

angular.module('myApp.patients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/patients', {
    templateUrl: 'patients/patients.html',
    controller: 'patientsCtrl'
  });
}])

.controller('patientsCtrl', ['$http', 'apiUrl', '$scope',function($http, apiUrl, $scope) {

	$scope.loadObjects = function() {
		$http({
			method: 'GET',
			url: apiUrl+'/Patients'
		}).then(function(response) {
			$scope.patients = response.data;
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

	$scope.newObject = function() {
		$scope.patients.push({edit: true});
	}

	$scope.editObject = function(object) {
		// AJAX Put
		$scope.toggleEdit(object);
	}

	$scope.deleteObject = function(object) {
		// AJAX Delete
		$scope.loadObjects();
	}

	$scope.loadObjects();

}]);