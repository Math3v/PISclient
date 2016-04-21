'use strict';

angular.module('myApp.visits', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/visits', {
		templateUrl: 'visits/visits.html',
		controller: 'crudController',
		resolve: {
			url: function(){ return '/Visits'; },
			obj: function(){ return 'visit'; },
			currentUser: function(currentUserService){ return currentUserService.getUser(); }
		}
	});
}])

.controller('visitsController', ['$scope', function($scope){
	
	$scope.showNewModal = function() {
		$scope.visit = {};
		$( "#newVisit" ).modal('show');
	}

	$scope.showEditModal = function(visit) {
		$scope.visit = visit;
		$( "#editVisit" ).modal('show');
	}
}])