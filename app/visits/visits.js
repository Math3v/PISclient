'use strict';

angular.module('myApp.visits', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/visits-doctor', {
		templateUrl: 'visits/visits.html',
		controller: 'crudController',
		resolve: {
			url: function(){ return '/Visits'; },
			obj: function(){ return 'visit'; },
			currentUser: function(currentUserService){ return currentUserService.getUser(); }
		}
	});
	$routeProvider.when('/visits-patient', {
		templateUrl: 'visits/visits_patient.html',
		controller: 'crudController',
		resolve: {
			url: function(){ return '/Visits'; },
			obj: function(){ return 'visit'; },
			currentUser: function(currentUserService){ return currentUserService.getUser(); }
		}
	});
}])

.controller('visitsController', ['$scope', 'apiUrl', '$http', 'currentUserService', function($scope, apiUrl, $http, currentUserService){
	
	$scope.showNewModal = function() {
		$scope.visit = {};
		$( "#newVisit" ).modal('show');
	}

	$scope.showEditModal = function(visit) {
		$scope.visit = visit;
		$( "#editVisit" ).modal('show');
	}

	$scope.newVisit = function(visit) {
		visit.status = 'new';
		visit.patient_id = currentUserService.getUser().id;
		$http({
			method: 'POST',
			url: apiUrl + '/Visits',
			data: visit
		}).then(function(response) {
			console.log("SUccess");
			$scope.loadVisits();
		}, function(response) {
			console.log( "Error ", response);
		})
	}

	$scope.loadVisits = function() {
		$http({
			method: 'GET',
			url: apiUrl + '/Visits'
		}).then(function(response) {
			$scope.users = response.data;
		}, function(err) {
			console.log(err);
		})	
	}
}])